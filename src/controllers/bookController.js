const BookModel = require('../models/bookModel');

const createBook = async (req, res) => {
    try {
        let data = req.body;
        let createdBook = await BookModel.create(data);

        res.status(201).send({
            status : true,
            message : 'Book created successfully',
            data : createdBook
        })
    } catch (err) {
        res.status(500).send({
            status : false,
            message : err.message
        })
    }
}

const getAllBooks = async (req, res) => {
    try {
        let getBooks = await BookModel.find();
        res.status(200).send({
            status : true,
            message : 'Books fetched successfully',
            data : getBooks
        })
    } catch (err) {
        res.status(500).send({
            status : false,
            message : err.message
        })
    }
}

module.exports = { createBook, getAllBooks }