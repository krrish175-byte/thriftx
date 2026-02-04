const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    registerUser,
    loginUser,
    googleLogin,
    getUserProfile,
    verifyAadhaar
} = require('../controllers/authController');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', registerUser);

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', loginUser);

// @route   POST api/auth/google
// @desc    Google Login
// @access  Public
router.post('/google', googleLogin);

// @route   GET api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, getUserProfile);

// @route   POST api/auth/verify-aadhaar
// @desc    Verify Aadhaar
// @access  Private
router.post('/verify-aadhaar', auth, verifyAadhaar);

module.exports = router;
