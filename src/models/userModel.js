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
        unique: true,
        required: true
    },
    emailId: {
        type: String,
        unique: true,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "LGBTQ"],
        required: true
    },
    age: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)

