const Blog = require('../models/Blog');
const path = require('path');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ date: -1 });
        res.json(blogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private
exports.createBlog = async (req, res) => {
    try {
        const { title, excerpt, content, category } = req.body;

        if (!req.file) {
            return res.status(400).json({ msg: 'Please upload an image' });
        }

        // Image path
        const imageUrl = `/uploads/${req.file.filename}`;

        // Calculate read time (rough estimate)
        const wordsPerMinute = 200;
        const noOfWords = content.split(/\s+/g).length;
        const minutes = Math.ceil(noOfWords / wordsPerMinute);
        const readTime = `${minutes} min read`;

        const newBlog = new Blog({
            title,
            excerpt: excerpt || content.substring(0, 150) + '...',
            content,
            author: req.user.id,
            authorName: req.user.name || 'Anonymous Student',
            category: category || 'COMMUNITY',
            imageUrl,
            readTime
        });

        const blog = await newBlog.save();
        res.json(blog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Like/Unlike a blog
// @route   PUT /api/blogs/:id/like
// @access  Private
exports.likeBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ msg: 'Blog not found' });
        }

        // Check if the blog has already been liked by this user
        const likeIndex = blog.likes.indexOf(req.user.id);

        if (likeIndex > -1) {
            // Already liked, so unlike it
            blog.likes.splice(likeIndex, 1);
        } else {
            // Not liked yet, so add like
            blog.likes.push(req.user.id);
        }

        await blog.save();
        res.json(blog.likes);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Blog not found' });
        }
        res.status(500).send('Server Error');
    }
};
