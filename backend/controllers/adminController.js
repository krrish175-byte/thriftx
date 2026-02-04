const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');

exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();

        // Calculate total sales
        const salesData = await Order.aggregate([
            { $match: { paymentStatus: { $in: ['released', 'completed'] } } },
            { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } }
        ]);

        const totalSales = salesData.length > 0 ? salesData[0].total : 0;
        const totalOrders = await Order.countDocuments();

        res.json({
            totalUsers,
            totalProducts,
            totalSales,
            totalOrders
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getSalesAnalytics = async (req, res) => {
    try {
        // Get sales for the last 6 months
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const sales = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: sixMonthsAgo },
                    paymentStatus: { $in: ['released', 'completed', 'pending'] } // Include pending for now to verify data
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    totalSales: { $sum: "$amount" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json(sales);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getCategoryAnalytics = async (req, res) => {
    try {
        const categories = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(categories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        // Simple pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const users = await User.find()
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await User.countDocuments();

        res.json({
            users,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getAllTransactions = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const orders = await Order.find()
            .populate('buyer', 'name email')
            .populate('seller', 'name email')
            .populate('product', 'title price')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Order.countDocuments();

        res.json({
            orders,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const products = await Product.find()
            .populate('seller', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Product.countDocuments();

        res.json({
            products,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Add verifyProduct to exports
const { sendVerificationEmail } = require('../utils/emailService');

exports.verifyProduct = async (req, res) => {
    try {
        const { status, reason } = req.body; // status: 'active' or 'rejected'
        const product = await Product.findById(req.params.id).populate('seller', 'email name');

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        product.status = status;
        if (status === 'rejected') {
            product.rejectionReason = reason;
        } else {
            product.rejectionReason = ''; // Clear reason if approved
        }
        await product.save();

        // Send email notification
        if (product.seller && product.seller.email) {
            await sendVerificationEmail(product.seller.email, product.title, status, reason);
        }

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Export all functions explicitly to avoid overwriting issues
// (Ensure all previous functions like getAllUsers, etc. are still exported)
