const newAuthorModel = require('../models/newAuthorModel');

const createAuthor= async function (req, res) {
    let author = req.body
    let newAuthor = await newAuthorModel.create(author)
    res.send({data: newAuthor})
}

module.exports= { createAuthor }
