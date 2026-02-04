const User = require('../models/User');
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
            return res.status(400).json({ msg: 'User already exists' });
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
        res.status(500).send('Server error');
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
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const token = generateToken(user.id);
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Google Login
// @route   POST /api/auth/google
// @access  Public
exports.googleLogin = async (req, res) => {
    const { tokenId } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const { name, email, picture, sub } = ticket.getPayload();

        let user = await User.findOne({ email });

        if (user) {
            // User exists, update googleId/picture if missing
            user.googleId = sub;
            user.picture = picture;
            await user.save();
        } else {
            // Create new user
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
        console.error('Google Auth Error:', err);
        res.status(401).json({ msg: 'Google Token Verification Failed' });
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
        res.status(500).send('Server Error');
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
        if (!user) return res.status(404).json({ msg: 'User not found' });

        if (user.aadhaarVerified) {
            return res.status(400).json({ msg: 'User already verified' });
        }

        // Simulate verification success
        if (aadhaarNumber && aadhaarNumber.length === 12) {
            user.aadhaarVerified = true;
            user.aadhaarVerificationHash = await bcrypt.hash(aadhaarNumber, 10); // Store hash only
            await user.save();
            return res.json({ msg: 'Aadhaar Verification Successful', verified: true });
        } else {
            return res.status(400).json({ msg: 'Invalid Aadhaar Number format' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}
