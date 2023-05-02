const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    author_id: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ratings: {
        type: Number,
        required: true
    }

}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema)
