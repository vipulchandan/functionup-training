const AuthorModel = require('../models/authorModel')
const BookModel= require('../models/bookModel')

const createAuthor = async (req, res) => {
    try {
        let data = req.body;
        let savedData = await AuthorModel.create(data);
        res.status(201).send({
            status: true,
            msg: "Author created successfully",
            data: savedData
        })
    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    }
}

const findAuthor = async (req, res) => {
    try {
        let name = req.body.name;
        let book = await BookModel.findOneAndUpdate(
            { name },
            { price : 100 },
            { new: true }
        )

        let author = await AuthorModel.findOne({ author_id: book.author_id});
        let result = {
            author_name: author.author_name,
            price: book.price
        }
        res.status(200).send({
            status: true,
            msg: "Author fetched successfully",
            data: result
        })
    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    }

}

module.exports = { createAuthor, findAuthor }