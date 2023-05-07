const ProductModel = require("../models/productModel")

const createProduct= async function (req, res) {
    try {
        let data= req.body;
        let savedData= await ProductModel.create(data);
        res.send({ msg : savedData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg : 'Internal server error' });
    }
}

module.exports.createProduct= createProduct