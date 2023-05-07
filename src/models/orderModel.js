const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema( {
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    productId: {
        type: ObjectId,
        ref: 'Product',
        required: true,
    },
    amount: {
        type: Number,
        default: 0,
    },
    isFreeAppUser: {
        type: Boolean,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema) //users
