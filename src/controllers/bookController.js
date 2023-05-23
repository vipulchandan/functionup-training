const { count } = require("console")
const BookModel = require("../models/bookModel")

const createBook= async function (req, res) {
    try {
        let data= req.body
        let savedData= await BookModel.create(data)
        res.status(201).send({
            status: true,
            msg: "Book created successfully",
            data: savedData
        })
    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    }
}


const getAllBooks = async(req, res) => {
    try {
        let allBooks = await BookModel.find();
        res.status(200).send({
            status: true,
            msg: "Books fetched successfully",
            data: allBooks
        })
    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    }
}



const getBooksData = async function (req, res) {
    try {
        let bookId = req.params.bookId;
        let book = await BookModel.findById(bookId);
        if(!book) {
            return res.status(404).json({ 
                status: false, 
                msg: "book not found" 
            });
        }
        res.status(200).send({
            status: true,
            msg: "book fetched successfully",
            book
        })

        // let allBooks = await BookModel.find({ authorName: "HO" })
        // console.log(allBooks)
        // if (allBooks.length > 0) res.send({ msg: allBooks, condition: true })
        // else res.send({ msg: "No books found", condition: false })

    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    }
}


const updateBooks = async function (req, res) {
    try {
        let bookId = req.params.bookId;
        let data = req.body;
        let book = await BookModel.findById(bookId);
        if(!book) {
            return res.status(400).send({
                status: false,
                msg: "book not found"
            })
        }
        let updatedbook = await bookModel.findByIdAndUpdate(
            bookId,
            data,
            { new: true }
        )
        await updatedbook.save();
        res.status(200).send({
            status: true,
            msg: "Book updated successfully",
            data: updatedbook
        })

        // let data = req.body // {sales: "1200"}
        // // let allBooks= await BookModel.updateMany( 
        // //     { author: "SK"} , //condition
        // //     { $set: data } //update in data
        // //  )
        // let allBooks = await BookModel.findOneAndUpdate(
        //     { authorName: "ABC" }, //condition
        //     { $set: data }, //update in data
        //     { new: true, upsert: true } ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT
        // )
    
        // res.send({ msg: allBooks })

    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    }
}

const deleteBooks = async function (req, res) {
    try {
        let bookId = req.params.bookId;
        let book = await BookModel.findById(bookId);
        if(!book) {
            return res.status(404).send({
                status: false,
                msg: "book not found"
            })
        }

        let allBooks = await BookModel.updateMany(
            {bookId}, 
            { $set: { isDeleted: true } },
            { new: true, upsert: true }
        )

        res.status(200).send({
            status: true,
            msg: "Book deleted successfully",
            data: allBooks
        })
        // let data = req.body 
        // let allBooks = await BookModel.updateMany(
        //     { authorName: "FI" }, //condition
        //     { $set: { isDeleted: true } }, //update in data
        //     { new: true } ,
        // )
    
        // res.send({ msg: allBooks })
    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    }
}



const totalSalesPerAuthor = async function (req, res) {
    // let data = req.body 
    try {
        let allAuthorSales = await BookModel.aggregate([
            {
                $group: {
                    _id: "$authorName",
                    totalSales: { $sum: "$sales" }
                }
            },
            { $sort: { totalSales: -1 } }
        ])
        res.status(200).send({
            status: true,
            msg: "Books fetched successfully",
            data: allAuthorSales
        })
    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    }

}

module.exports = {
    createBook,
    getAllBooks,
    getBooksData,
    updateBooks,
    deleteBooks,
    totalSalesPerAuthor
}


// module.exports.createBook = createBook
// module.exports.getAllBooks = getAllBooks
// module.exports.getBooksData = getBooksData
// module.exports.updateBooks = updateBooks
// module.exports.deleteBooks = deleteBooks
// module.exports.totalSalesPerAuthor = totalSalesPerAuthor
