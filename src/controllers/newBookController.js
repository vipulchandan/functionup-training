const newBookModel = require('../models/newBookModel');
const newPublisherModel = require('../models/newPublisherModel');
const newAuthorModel = require('../models/newAuthorModel');


const createBook = async (req, res) => {

        // Extract the book information from the request body
        const { name, authorId, price, ratings, publisherId } = req.body;

        // Find the author and library by ID
        const author = await newAuthorModel.findById(authorId);
        const publisher = await newPublisherModel.findById(publisherId);

        // If either the author or library is not found, return an error
        if (!author || !publisher) {
        return res.status(404).json({ message: 'Author or publisher not found' });
        }

        // Create a new book and save it to the database
        const book = new Book({
            name,
            author: author._id,
            price,
            ratings,
            publisher: publisher._id,
        });
        
        const savedBook = await book.save();

        // Return the saved book as a response
        return res.status(201).json(savedBook);
    
        // Validate that authorId is present
        // if (!authorId) {
        //   return res.status(400).json({ error: 'Author ID is required' });
        // }
    
        // // Validate that authorId is a valid ObjectId in the author collection
        // if (!mongoose.Types.ObjectId.isValid(authorId)) {
        //   return res.status(400).json({ error: 'Author ID is invalid' });
        // }
    
        // // Check if author exists in the database
        // const author = await newAuthorModel.findById({  });
        // if (!author) {
        //   return res.status(404).json({ error: 'Author not found' });
        // }
    
        // // Validate that publisherId is present
        // if (!publisherId) {
        //   return res.status(400).json({ error: 'Publisher ID is required' });
        // }
    
        // // Validate that publisherId is a valid ObjectId in the publisher collection
        // if (!mongoose.Types.ObjectId.isValid(publisherId)) {
        //   return res.status(400).json({ error: 'Publisher ID is invalid' });
        // }
    
        // // Check if publisher exists in the database
        // const publisher = await newPublisherModel.findById(publisherId);
        // if (!publisher) {
        //   return res.status(404).json({ error: 'Publisher not found' });
        // }
    
        // // Create a new book document and save it to the database
        // const book = new newBookModel({ name, author: authorId, price, ratings, publisher: publisherId });
        // await book.save();
    
        // res.json({ msg: book });
}

module.exports = { createBook }