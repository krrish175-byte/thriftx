const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, deleteProduct } = require('../controllers/productController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get('/', getProducts);

// @route   GET api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', getProductById);

// @route   POST api/products
// @desc    Create a product
// @access  Private
// Uploading up to 5 images
router.post('/', [auth, upload.array('images', 8)], createProduct);

// @route   DELETE api/products/:id
// @desc    Delete a product
// @access  Private
router.delete('/:id', auth, deleteProduct);

module.exports = router;
