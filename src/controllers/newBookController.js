const newBookModel = require('../models/newBookModel');
const newPublisherModel = require('../models/newPublisherModel');
const newAuthorModel = require('../models/newAuthorModel');
const { default: mongoose } = require('mongoose');


const createBook = async (req, res) => {
    try {
        // const { name, author, price, ratings, publisher } = req.body;

        if(!req.body.author) {
            return res.status(400).send({ 
                status: false,
                message: 'AuthorId is required'
             });
        }

        if(!req.body.publisher) {
            return res.status(400).send({ 
                status: false,
                message: 'PublisherId is required'
             });
        }

        if(!mongoose.Types.ObjectId.isValid(req.body.author)) {
            return res.status(400).send({ 
                status: false,
                message: 'Invalid AuthorId'
             });
        }

        if(!mongoose.Types.ObjectId.isValid(req.body.publisher)) {
            return res.status(400).send({ 
                status: false,
                message: 'Invalid PublisherId'
             });
        }

        const existingAuthor = await newAuthorModel.findById(req.body.author);
        if (!existingAuthor) {
            return res.status(404).send({ 
                status: false,
                message: 'Author not found'
             });
        }

        const existingPublisher = await newPublisherModel.findById(req.body.publisher);
        if (!existingPublisher) {
            return res.status(404).send({ 
                status: false,
                message: 'Publisher not found'
             });
        }

        // const book = new newBookModel({
        //     name,
        //     author,
        //     price,
        //     ratings,
        //     publisher
        // });
        // await book.save();
        
        const book = await newBookModel.create(req.body);

        res.status(201).send({
            status: true,
            message: 'Book created successfully',
            data: book
        })

    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

const getBooks = async (req, res) => {
    try {
        const books = await newBookModel.find().populate('author').populate('publisher');
        res.status(200).send({
            status: true,
            message: 'Books fetched successfully',
            data: books
        })
    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

const updatePublisherBooks = async (req, res) => {
    try {
        const penguin = await newPublisherModel.findOne({ name: 'Penguin' });
        const harperCollins = await newPublisherModel.findOne({ name: 'HarperCollins' });
        const updatedBook = await newBookModel.updateMany(
            { publisher: { $in: [penguin._id, harperCollins._id] } },
            { isHardCover: true },
            { new: true }
        );
        console.log(penguin, harperCollins);
        res.status(200).send({
            status: true,
            message: 'Books updated successfully',
            data: updatedBook
        });
    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

const updateBooksPrice = async (req, res) => {
    try {
        let updatedPrice = await newBookModel.updateMany(
            { authorRating: { $gt: 3.5 } },
            { $inc: { price: 10 } },
            { new: true }
          );
          res.status(200).send({ 
            status: true,
            message: 'Books updated successfully',
            data: updatedPrice
        })
    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message
        })
    }
}



module.exports = { createBook, getBooks, updatePublisherBooks, updateBooksPrice }