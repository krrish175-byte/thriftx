const express = require('express');
const router = express.Router();
const { getBlogs, createBlog, likeBlog } = require('../controllers/blogController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   GET api/blogs
// @desc    Get all blogs
// @access  Public
router.get('/', getBlogs);

// @route   POST api/blogs
// @desc    Create a blog
// @access  Private
router.post('/', [auth, upload.single('image')], createBlog);

// @route   PUT api/blogs/:id/like
// @desc    Like/Unlike a blog
// @access  Private
router.put('/:id/like', auth, likeBlog);

module.exports = router;
