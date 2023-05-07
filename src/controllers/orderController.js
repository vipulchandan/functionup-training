const OrderModel = require("../models/orderModel")
const UserModel = require("../models/userModel")
const ProductModel = require("../models/productModel")

const createOrder = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const isFreeAppUser = req.headers.isfreeappuser;

        const user = await UserModel.findById(userId);
        if(!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const product = await ProductModel.findById(productId);
        if(!product) {
            return res.status(400).json({ msg: 'Product not found' });
        }

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
            return res.send({ msg: order });
        }

        //Scenaio 2
        // For paid app user and the user has insufficient balance. We send an error that the user doesn't have enough balance
        else if (isFreeAppUser === 'false' && user.balance < product.price) {
            return res.status(400).json({ msg: 'Insufficient balance in user account' });
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
            return res.send({ msg: order });
        }

    } catch(err) {
        console.log(err);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

module.exports.createOrder = createOrder