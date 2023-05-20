const newAuthorModel = require('../models/newAuthorModel');

const createAuthor= async function (req, res) {
    try {
        let author = req.body
        let newAuthor = await newAuthorModel.create(author)
        res.status(201).send({
            status: true,
            msg: "Author created successfully",
            data: newAuthor
        })
        res.send({data: newAuthor})
    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    }
}

module.exports= { createAuthor }
