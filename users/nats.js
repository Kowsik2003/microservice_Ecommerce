const nats = require("node-nats-streaming");
const crypto = require("crypto");
const {Cart} = require('./user_model')

const stan = nats.connect("ticketing", crypto.randomBytes(4).toString("hex"), {
  url: "http://nats-srv:4222",
});

stan.on("connect", async () => {
  console.log("connected ");
  const productUpdate = stan.subscribe("product:updated", "user");
  const productDeleted = stan.subscribe("product:deleted","user")

  productUpdate.on("message",async  (msg) => {
    console.log(
      `No : ${msg.getSequence()} Data : ${(msg.getData())}`
    );
      const data = JSON.parse(msg.getData())
    const id = data._id;
    delete data._id;
    const cartupdate = await Cart.findOneAndUpdate({productId : id},data,{
      new : true
    });

    if(cartupdate)
      console.log("updated")
    else 
      console.log("no update")
  });

  productDeleted.on('message',async (msg) => {
    console.log(
      `No : ${msg.getSequence()} Data : ${(msg.getData())}`
    );

    const data = JSON.parse(msg.getData())
    const id = data._id;
    delete data._id;
    const cartdeleted = await Cart.findOneAndDelete({productId : id});

    if(cartdeleted)
      console.log("deleted")
    else 
      console.log("no delete")    
  })
});

module.exports = stan;
