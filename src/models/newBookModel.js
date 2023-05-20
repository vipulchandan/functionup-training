const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const newBookSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    author: {
      type: ObjectId,
      ref: 'newAuthor',
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    ratings: {
      type: Number,
      required: true
    },
    publisher: {
      type: ObjectId,
      ref: 'newPublisher',
      required: true
    },
    isHardCover: {
      type: Boolean,
      default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('newBook', newBookSchema);

