const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    age: {
        type: Number,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)
