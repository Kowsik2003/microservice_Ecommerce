const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    userId : {
        type : String,
    },
    product : [{
        id : {
            type : String
        },
        qty : {
            type : Number
        },
    }],
    status : {
        type : String,
        default : "placed"
    },
    totalPrice : {
        type: Number
    }
},{
    timestamps : true
});

const Order = mongoose.model('order',orderSchema)

module.exports = {Order};