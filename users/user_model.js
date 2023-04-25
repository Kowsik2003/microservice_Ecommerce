const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    email : {
        type : String,
    },
    password : {
        type : String
    }
});

userSchema.pre('save', async function (next) {
        this.password = await bcrypt.hash(this.password,8);

        next();
})

userSchema.methods.checkPassword = async function (currentPassword , userPassword) {
    return await bcrypt.compare(currentPassword,userPassword);
}

const likedProductSchema = mongoose.Schema({
    productId : {
        type : String
    },
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
})
const User = mongoose.model('user',userSchema)
const Liked = mongoose.model('likedproducts',likedProductSchema)

module.exports = {User, Liked};