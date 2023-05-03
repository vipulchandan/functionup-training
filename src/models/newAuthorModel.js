const mongoose = require('mongoose');

const newAuthorSchema = new mongoose.Schema({
  authorName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
},{ timestamps: true });

module.exports = mongoose.model('newAuthor', newAuthorSchema);
