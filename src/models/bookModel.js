const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName : {
        type: String,
        required: true,
    },
    prices: {
        indianPrice: String,
        europeanPrice: String
    },
    year: {
        type: Number,
        default: 2021
    },
    tags: [String],
    authorName : {
        type: String,
        required: true,
    },
    totalPages: Number,
    stockAvailable: Boolean,
}, { timestamps: true })

module.exports = mongoose.model('Book', bookSchema);