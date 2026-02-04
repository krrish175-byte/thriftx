const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    createOrder,
    verifyPayment,
    getMyOrders,
    getIncomingOrders,
    updateOrderStatus
} = require('../controllers/orderController');

// @route   POST api/orders
// @desc    Create new order
// @access  Private
router.post('/', auth, createOrder);

// @route   POST api/orders/verify
// @desc    Verify Payment
// @access  Private
router.post('/verify', auth, verifyPayment);

// @route   GET api/orders/my-orders
// @desc    Get my orders (as buyer)
// @access  Private
router.get('/my-orders', auth, getMyOrders);

// @route   GET api/orders/incoming
// @desc    Get my sales (incoming orders)
// @access  Private
router.get('/incoming', auth, getIncomingOrders);

// @route   PUT api/orders/:id/status
// @desc    Update order status
// @access  Private
router.put('/:id/status', auth, updateOrderStatus);

module.exports = router;
