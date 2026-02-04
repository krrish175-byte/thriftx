const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        // required: true // Not required for Google OAuth users ideally, but we'll handle this in controller
    },
    picture: {
        type: String
    },
    googleId: {
        type: String
    },
    phone: {
        type: String
    },
    college: {
        type: String,
        default: 'NMIMS'
    },
    studentIdCard: {
        type: String // URL to uploaded ID card image
    },
    isVerifiedStudent: {
        type: Boolean,
        default: false
    },
    aadhaarVerified: {
        type: Boolean,
        default: false
    },
    aadhaarVerificationHash: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);
