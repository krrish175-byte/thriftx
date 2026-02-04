const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Clothes', 'Jewelry', 'Shoes', 'Accessories', 'Books', 'Electronics', 'Other']
    },
    condition: {
        type: String,
        required: true,
        enum: ['Brand New', 'Excellent', 'Good', 'Fair', 'Poor']
    },
    images: [{
        type: String // URLs from Cloudinary
    }],
    price: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number
    },
    aiSuggestedPrice: {
        min: Number,
        max: Number,
        value: Number,
        confidence: Number
    },
    brand: {
        type: String
    },
    size: {
        type: String
    },
    usageDuration: {
        type: String // e.g., "6 months", "2 times worn"
    },
    isSold: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['active', 'sold', 'pending', 'removed'],
        default: 'active'
    },
    views: {
        type: Number,
        default: 0
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    hasBill: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for search
ProductSchema.index({ title: 'text', description: 'text', brand: 'text' });

module.exports = mongoose.model('Product', ProductSchema);
