const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName : {
        type: String,
        required: true,
    },
    prices: {
        indianPrice: {
            type: String,
            required: true
        },
        europeanPrice: String
    },
    year: {
        type: Number,
        required: true,
        default: 2021
    },
    tags: {
        type: Array,
        items: {
            type: String
        },
        required: true
    },
    authorName : {
        type: String,
        required: true,
    },
    totalPages: {
        type: Number,
        required: true
    },
    stockAvailable: {
        type: Boolean,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Book', bookSchema);