const nats = require("node-nats-streaming");
const crypto = require("crypto");

const stan = nats.connect("ticketing", crypto.randomBytes(4).toString("hex"), {
  url: "http://nats-srv:4222",
});

stan.on("connect", () => {
  console.log("connected to server");
});

module.exports = stan;
