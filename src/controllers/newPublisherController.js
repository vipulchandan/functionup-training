const newPublisherModel = require('../models/newPublisherModel');

const createPublisher= async function (req, res) {
    let publisher = req.body
    let newPublisher = await newPublisherModel.create(publisher)
    res.send({data: newPublisher})
}

module.exports= { createPublisher }
