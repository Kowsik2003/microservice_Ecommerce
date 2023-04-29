const nats = require("node-nats-streaming");
const crypto = require("crypto");
const {Cart} = require('./user_model')

const stan = nats.connect("ticketing", crypto.randomBytes(4).toString("hex"), {
  url: "http://nats-srv:4222",
});

stan.on("connect", async () => {
  console.log("connected ");
  const options = stan.subscriptionOptions().setManualAckMode(true)

  const productUpdate = stan.subscribe("product:updated", "users",options);
  const productDeleted = stan.subscribe("product:deleted","users",options)

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

    msg.ack();
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

    msg.ack();
  })
});

process.on("SIGINT",()=> stan.close())
process.on("SIGTERM",()=> stan.close())

module.exports = stan;
