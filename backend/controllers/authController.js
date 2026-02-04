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
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${googleAccessToken}` }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user info from Google');
        }

        const { name, email, picture, sub } = await response.json();

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
                googleId: sub,
                // Password is required by schema but not for google users. 
                // We can set a dummy password or handle it in schema. 
                // Schema has password NOT required in my previous view (commented out required).
                // Let's set a random one just in case or leave empty if schema permits.
                // Schema view showed: `password: { type: String, // required: true ... }`
                // So it's fine.
            });
            await user.save();
        }

        const token = generateToken(user.id);
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, picture: user.picture } });
    } catch (err) {
        console.error('Google Auth Error:', err);
        res.status(401).json({ message: 'Google Token Verification Failed' });
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
