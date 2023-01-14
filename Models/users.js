const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const userSchema = new schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    type:{
        type:String, required:true
    },
    salonId:{
        type:String,required:true
    }


});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(this.password, salt)
            this.password = hashedPassword
            next()
        } catch (error) {
            next(error)
        }
    }
})
userSchema.post('save', async function (next) {
    try {
        console.log("call after");
    } catch (error) {
        next(error)
    }
})

module.exports = mongoose.model("User", userSchema, "User");