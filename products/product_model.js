const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {
        type : String,
    },
    price : {
        type : Number
    },
    qty : {
    	type : Number
    },
    description : {
    	type : String
    },
    photos : [{
        	type : String
        }],
});

module.exports = mongoose.model('product',userSchema);