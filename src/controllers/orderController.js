const OrderModel = require("../models/orderModel")
const UserModel = require("../models/userModel")
const ProductModel = require("../models/productModel")

const createOrder = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        
        const user = await UserModel.findById(userId);
        if(!user) {
            return res.status(401).send({
                status: false,
                msg: 'User not found'
            });
        }
        
        const product = await ProductModel.findById(productId);
        if(!product) {
            return res.status(400).send({
                status: false,
                msg: 'Product not found'
            });
        }

        const isFreeAppUser = req.headers.isfreeappuser;

        //Scenario 1
        // For paid user app and the user has sufficient balance. We deduct the balance from user's balance and update the user. We create an order document
        if (isFreeAppUser === 'false' && user.balance >= product.price) {
            user.balance -= product.price;
            await user.save();

            const order = new OrderModel({
                userId,
                productId,
                amount: product.price,
                isFreeAppUser: false,
                date: new Date(),
            });
            // await OrderModel.create(order);
            await order.save();
            return res.status(201).send({
                status: true,
                msg: "Order created successfully",
                data: order
            })
        }

        //Scenaio 2
        // For paid app user and the user has insufficient balance. We send an error that the user doesn't have enough balance
        else if (isFreeAppUser === 'false' && user.balance < product.price) {
            return res.status(400).send({
                status: false,
                msg: 'Insufficient balance in user account'
            });
        }

         //Scenario 3
        // For free app user, we dont check user's balance and create the order with 0 amount.
        else if (isFreeAppUser === 'true') {
            const order = new OrderModel({
                userId,
                productId,
                amount: 0,
                isFreeAppUser: true,
                date: new Date(),
            });
            await order.save();
            return res.status(201).send({
                status: true,
                msg: "Order created successfully",
                data: order
            })
        }

    } catch(err) {
        console.log(err);
        res.status(500).send({
            status: false,
            msg: err.message
        });
    }
}

const getAllOrders = async (req, res) => {
    try {
        let orders = await OrderModel.find().populate('userId').populate('productId');
        res.status(200).send({
            status: true,
            msg: "Orders fetched successfully",
            data: orders
        })
    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        });
    }
}

module.exports = {
    createOrder,
    getAllOrders
}