const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    status: {
        type: String,
        enum: ['placed', 'confirmed', 'shipped', 'delivered', 'completed', 'disputed', 'cancelled'],
        default: 'placed'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'held', 'released', 'refunded', 'failed'],
        default: 'pending'
    },
    razorpayOrderId: {
        type: String
    },
    razorpayPaymentId: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    deliveryAddress: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
    },
    deliveryMethod: {
        type: String,
        enum: ['pickup', 'standard', 'express'],
        default: 'pickup' // On-campus pickup
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', OrderSchema);
