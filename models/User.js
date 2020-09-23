const mongoose = require('mongoose');
const { isEmail } = require('validator');
const findorCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
    googleId:{
        type: String,
        required: [true, 'Please Enter Email'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Please Enter Name']
    },
    email: {
        type: String,
        required: [true, 'Please Enter Email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please Enter a valid Email']
    },
    voted: {
        type:Boolean,
        default: false
    }
});

userSchema.plugin(findorCreate);

const User = mongoose.model('user', userSchema);

module.exports = User;