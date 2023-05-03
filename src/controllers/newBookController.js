const newBookModel = require('../models/newBookModel');
const newPublisherModel = require('../models/newPublisherModel');
const newAuthorModel = require('../models/newAuthorModel');


const createBook = async (req, res) => {

        const { name, author, price, ratings, publisher } = req.body;

        const existingAuthor = await newAuthorModel.findById(author);
        if (!existingAuthor) {
            return res.status(400).json({ message: 'Author not found' });
        }

        const existingPublisher = await newPublisherModel.findById(publisher);
        if (!existingPublisher) {
            return res.status(400).json({ message: 'Publisher not found' });
        }

        const book = new newBookModel({
            name,
            author,
            price,
            ratings,
            publisher
        });

        await book.save();

        res.json({ msg: book });
}

const getBooks = async (req, res) => {
    const books = await newBookModel.find().populate('author').populate('publisher');
    res.send({ msg: books })
}

const updatePublisherBooks = async (req, res) => {

    const penguin = await newPublisherModel.findOne({ name: 'Penguin' });
    const harperCollins = await newPublisherModel.findOne({ name: 'HarperCollins' });
    const updatedBook = await newBookModel.updateMany(
        { publisher: { $in: [penguin._id, harperCollins._id] } },
        { isHardCover: true }
    );
    
    res.send({ msg: updatedBook })

}

const updateBooksPrice = async (req, res) => {

    let updatedPrice = await newBookModel.updateMany(
        { authorRating: { $gt: 3.5 } },
        { $inc: { price: 10 } }
      );
    
    res.send({ msg: updatedPrice })

}

module.exports = { createBook, getBooks, updatePublisherBooks, updateBooksPrice }