const nats = require("node-nats-streaming");
const crypto = require("crypto");
const Product = require('./product_model')

const stan = nats.connect("ticketing", crypto.randomBytes(4).toString("hex"), {
  url: "http://nats-srv:4222",
});

stan.on("connect", async () => {
  console.log("connected to server");
  const ordercreated = stan.subscribe('order:created',"product");

  ordercreated.on('message', async(msg) => {
    const data = JSON.parse(msg.getData())
    console.log(data)
  
  })

});

module.exports = stan;

