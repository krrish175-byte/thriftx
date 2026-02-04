const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {
    getDashboardStats,
    getSalesAnalytics,
    getCategoryAnalytics,
    getAllUsers,
    getAllTransactions,
    getAllProducts,
    verifyProduct
} = require('../controllers/adminController');

// All routes are protected by auth and admin middleware
router.use(auth, admin);

// @route   GET api/admin/stats
// @desc    Get dashboard aggregated stats
// @access  Private/Admin
router.get('/stats', getDashboardStats);

// @route   GET api/admin/analytics/sales
// @desc    Get sales analytics for graphs
// @access  Private/Admin
router.get('/analytics/sales', getSalesAnalytics);

// @route   GET api/admin/analytics/categories
// @desc    Get category analytics for pie chart
// @access  Private/Admin
router.get('/analytics/categories', getCategoryAnalytics);

// @route   GET api/admin/users
// @desc    Get all users with pagination
// @access  Private/Admin
router.get('/users', getAllUsers);

// @route   GET api/admin/transactions
// @desc    Get all transactions with pagination
// @access  Private/Admin
router.get('/transactions', getAllTransactions);

// @route   GET api/admin/products
// @desc    Get all products with pagination
// @access  Private/Admin
router.get('/products', getAllProducts);

// @route   PUT api/admin/products/:id/verify
// @desc    Verify or Reject a product
// @access  Private/Admin
router.put('/products/:id/verify', verifyProduct);

module.exports = router;
