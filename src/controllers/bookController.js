const BookModel = require('../models/bookModel');

const createBook = async (req, res) => {
    let data = req.body;
    let createdBook = await BookModel.create(data);

    res.send({ msg: createdBook });
}

const getAllBooks = async (req, res) => {
    let getBooks = await BookModel.find()
    res.send({ msg : getBooks });
}

module.exports = { createBook, getAllBooks }