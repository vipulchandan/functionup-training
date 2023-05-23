const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: {
        type: String,
        required: true
    }, 
    authorName: {
        type: String,
        required: true
    }, 
    tags: [String],
    
    isPublished: {
        type: Boolean,
        required: true
    },
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    sales: {
        type: Number, 
        default: 10
    },
    summary :  {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    } 

}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) //users
