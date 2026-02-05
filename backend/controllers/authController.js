const User = require('../models/User');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ user: { id } }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @desc    Register User (Email/Password - optional if Google only, but good to have)
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
            phone
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const token = generateToken(user.id);
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Login User (Email/Password)
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const token = generateToken(user.id);
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Google Login
// @route   POST /api/auth/google
// @access  Public
exports.googleLogin = async (req, res) => {
    const { googleAccessToken } = req.body;

    try {
        if (!googleAccessToken) {
            return res.status(400).json({ message: 'Google Access Token is missing' });
        }

        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${googleAccessToken}` }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Google UserInfo API Error:', {
                status: response.status,
                data: errorData
            });
            throw new Error(`Google API Error: ${response.status}`);
        }

        const { name, email, picture, sub } = await response.json();
        // ... (rest of the logic)
        let user = await User.findOne({ email });

        if (user) {
            user.googleId = sub;
            user.picture = picture;
            await user.save();
        } else {
            user = new User({
                name,
                email,
                picture,
                googleId: sub
            });
            await user.save();
        }

        const token = generateToken(user.id);
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, picture: user.picture } });
    } catch (err) {
        console.error('Google Auth Controller Error:', err);
        res.status(401).json({ message: `Google Token Verification Failed: ${err.message}` });
    }
};

// @desc    Get User Profile
// @route   GET /api/auth/me
// @access  Private
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Aadhaar Verification (Mock)
// @route   POST /api/auth/verify-aadhaar
// @access  Private
exports.verifyAadhaar = async (req, res) => {
    // In a real app, this would integrate with DigiLocker API or similar.
    // Here we simulate the process.
    const { aadhaarNumber } = req.body; // In reality, we shouldn't handle raw Aadhaar easily

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.aadhaarVerified) {
            return res.status(400).json({ message: 'User already verified' });
        }

        // Simulate verification success
        if (aadhaarNumber && aadhaarNumber.length === 12) {
            user.aadhaarVerified = true;
            user.aadhaarVerificationHash = await bcrypt.hash(aadhaarNumber, 10); // Store hash only
            await user.save();
            return res.json({ message: 'Aadhaar Verification Successful', verified: true });
        } else {
            return res.status(400).json({ message: 'Invalid Aadhaar Number format' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

// @desc    Get Wishlist Items
// @route   GET /api/auth/wishlist
// @access  Private
exports.getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: 'wishlist',
            populate: { path: 'seller', select: 'name picture verified verifiedSeller' }
        });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user.wishlist);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Toggle item in wishlist
// @route   POST /api/auth/wishlist/:productId
// @access  Private
exports.toggleWishlist = async (req, res) => {
    try {
        const productId = req.params.productId;
        const userId = req.user.id;

        const [user, product] = await Promise.all([
            User.findById(userId),
            Product.findById(productId)
        ]);

        if (!user) return res.status(404).json({ message: 'User not found' });
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const userIndex = user.wishlist.indexOf(productId);
        const productIndex = product.likes.indexOf(userId);

        let isWishlisted;
        if (userIndex > -1) {
            // Remove from wishlist
            user.wishlist.splice(userIndex, 1);
            if (productIndex > -1) product.likes.splice(productIndex, 1);
            isWishlisted = false;
        } else {
            // Add to wishlist
            user.wishlist.push(productId);
            product.likes.push(userId);
            isWishlisted = true;
        }

        await Promise.all([user.save(), product.save()]);
        res.json({ message: isWishlisted ? 'Added to wishlist' : 'Removed from wishlist', isWishlisted });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};
