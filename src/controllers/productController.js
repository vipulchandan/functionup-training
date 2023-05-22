const ProductModel = require("../models/productModel")

const createProduct= async function (req, res) {
    try {
        let data= req.body;
        let savedData= await ProductModel.create(data);
        res.status(201).send({
            status: true,
            msg: "Product created successfully",
            data: savedData
        })
        res.send({ msg : savedData });
    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        });
    }
}

const getAllPrducts = async (req, res) => {
    try {
        let data = await ProductModel.find();
        res.status(200).send({
            status: true,
            msg: "Products fetched successfully",
            data: data
        })
    } catch (err) {
        res.status(500).send({ 
            status: false,
            msg: err.message
        });
    }
}

module.exports = {
    createProduct,
    getAllPrducts
}