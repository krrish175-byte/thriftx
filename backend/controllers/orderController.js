const Order = require('../models/Order');
const Product = require('../models/Product');
const razorpayService = require('../services/razorpay');

// @desc    Create new order (Initiate Payment)
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
    const { productId, deliveryAddress, deliveryMethod } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ msg: 'Product not found' });
        if (product.status !== 'active') return res.status(400).json({ msg: 'Product not available' });
        if (product.seller.toString() === req.user.id) return res.status(400).json({ msg: 'Cannot buy your own product' });

        // Calculate total amount (add delivery fee if applicable)
        let amount = product.price;
        if (deliveryMethod === 'standard') amount += 50;
        if (deliveryMethod === 'express') amount += 100;

        // Create Razorpay Order
        const razorpayOrder = await razorpayService.createRazorpayOrder(amount);

        // Create Order in DB (Pending Payment)
        const order = new Order({
            buyer: req.user.id,
            seller: product.seller,
            product: productId,
            amount,
            deliveryAddress,
            deliveryMethod,
            razorpayOrderId: razorpayOrder.id,
            paymentStatus: 'pending'
        });

        await order.save();

        res.json({
            order,
            key_id: process.env.RAZORPAY_KEY_ID
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Verify Payment
// @route   POST /api/orders/verify
// @access  Private
exports.verifyPayment = async (req, res) => {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = req.body;

    try {
        const isValid = razorpayService.verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);

        if (!isValid) return res.status(400).json({ msg: 'Payment Verification Failed' });

        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ msg: 'Order not found' });

        order.paymentStatus = 'held'; // Escrow
        order.razorpayPaymentId = razorpayPaymentId;
        order.status = 'placed';
        await order.save();

        // Mark product as pending/sold
        const product = await Product.findById(order.product);
        product.status = 'pending';
        await product.save();

        res.json({ msg: 'Payment Successful', order });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get User Orders (As Buyer)
// @route   GET /api/orders/my-orders
// @access  Private
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ buyer: req.user.id })
            .populate('product')
            .populate('seller', 'name email')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// @desc    Get Seller Orders (Incoming)
// @route   GET /api/orders/incoming
// @access  Private
exports.getIncomingOrders = async (req, res) => {
    try {
        const orders = await Order.find({ seller: req.user.id })
            .populate('product')
            .populate('buyer', 'name email address') // Assuming user has address field or similar
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// @desc    Update Order Status
// @route   PUT /api/orders/:id/status
// @access  Private
exports.updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ msg: 'Order not found' });

        // Authorization checks (simplistic for now)
        // Seller can mark shipped, confirmed
        // Buyer can mark delivered/completed

        // TODO: Add strict state machine logic

        order.status = status;

        if (status === 'completed') {
            order.paymentStatus = 'released';
            const product = await Product.findById(order.product);
            product.status = 'sold';
            product.isSold = true;
            await product.save();
        }

        await order.save();
        res.json(order);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
