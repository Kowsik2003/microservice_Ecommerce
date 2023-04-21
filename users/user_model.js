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

module.exports = mongoose.model('user',userSchema);