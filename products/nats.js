const nats = require("node-nats-streaming");
const crypto = require("crypto");
const Product = require('./product_model')

const stan = nats.connect("ticketing", crypto.randomBytes(4).toString("hex"), {
  url: "http://nats-srv:4222",
});

stan.on("connect", async () => {
  console.log("connected to server");
  const options = stan.subscriptionOptions().setManualAckMode(true)
  const ordercreated = stan.subscribe('order:created',"product",options);

  ordercreated.on('message', async(msg) => {
    const data = JSON.parse(msg.getData())
    console.log(data)
  
  })

});

process.on("SIGINT",()=> stan.close())
process.on("SIGTERM",()=> stan.close())

module.exports = stan;

