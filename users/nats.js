const nats = require("node-nats-streaming");
const crypto = require("crypto");

const stan = nats.connect("ticketing", crypto.randomBytes(4).toString("hex"), {
  url: "http://172.16.5.200:4222",
});

stan.on("connect", () => {
  console.log("connected ");
  const productUpdate = stan.subscribe("product:updated", "user");

  productUpdate.on("message", (msg) => {
    console.log(
      `No : ${msg.getSequence()} Data : ${JSON.parse(msg.getData())}`
    );
  });
});

module.exports = stan;
