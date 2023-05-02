const AuthorModel = require('../models/authorModel')
const BookModel= require('../models/bookModel')

const createAuthor = async (req, res) => {
    let data = req.body;
    let savedData = await AuthorModel.create(data);
    res.send({ msg: savedData });
}

const findAuthor = async (req, res) => {
    let book = await BookModel.findOneAndUpdate(
        { name: 'Two states' },
        { price : 100 },
        { new: true }
    )

    let author = await AuthorModel.findOne({ author_id: book.author_id});
    let result = {
        author_name: author.author_name,
        price: book.price
    }

    res.send({ msg: result })
}

module.exports = { createAuthor, findAuthor }