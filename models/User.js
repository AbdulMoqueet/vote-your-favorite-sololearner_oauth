const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: [true, 'Please Enter Email'],
        unique: true
    },
    dp: {
        type: String
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
        type: Boolean,
        default: false
    },
    votedFor: {
        type: String,
        default: ''
    },
    createdAt: {
        type: String
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;