const newPublisherModel = require('../models/newPublisherModel');

const createPublisher= async function (req, res) {
    try {
        let publisher = req.body
        let newPublisher = await newPublisherModel.create(publisher)
        res.status(201).send({
            status: true,
            msg: "Publisher created successfully",
            data: newPublisher
        })
    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    }
}

module.exports= { createPublisher }
