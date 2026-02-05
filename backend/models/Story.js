const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        default: '' // Optional now
    },
    additionalImages: [{
        type: String
    }],
    author: {
        type: String,
        required: true,
        default: 'Anonymous Student'
    },
    tags: [{
        type: String
    }],
    category: {
        type: String,
        default: 'COMMUNITY'
    },
    readTime: {
        type: String,
        default: '3 min read'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    likes: [{
        type: String // User IDs
    }],
    comments: [{
        user: String,
        text: String,
        date: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('Story', storySchema);
