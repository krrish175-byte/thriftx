const express = require('express');
const router = express.Router();
const Story = require('../models/Story');

// @route   POST /api/stories
// @desc    Create a new story
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { title, description, content, coverImage, additionalImages, author, tags, category } = req.body;

        // Word Count Validation (Min 200 words)
        const wordCount = content.trim().split(/\s+/).length;
        if (wordCount < 200) {
            return res.status(400).json({ message: `Story is too short (${wordCount} words). Minimum 200 words required.` });
        }

        const newStory = new Story({
            title,
            description,
            content,
            coverImage,
            additionalImages,
            author,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            category: category || 'COMMUNITY',
            status: 'pending' // Pending by default
        });

        const savedStory = await newStory.save();
        res.status(201).json(savedStory);
    } catch (err) {
        console.error('Error creating story:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET /api/stories
// @desc    Get all stories (Public: Approved only, Admin: All via query)
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { status } = req.query;
        let query = { status: 'approved' }; // Default public view

        if (status) {
            query = { status }; // Admin can request 'pending'
        }

        const stories = await Story.find(query).sort({ createdAt: -1 });
        res.json(stories);
    } catch (err) {
        console.error('Error fetching stories:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET /api/stories/:id
// @desc    Get single story
router.get('/:id', async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        if (!story) return res.status(404).json({ message: 'Story not found' });
        res.json(story);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT /api/stories/:id/like
// @desc    Like a story
router.put('/:id/like', async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        // Simple toggle for now (anonymous) - real header auth needed for unique users
        // For demo: just increment length by pushing a dummy ID or using a counter
        // But user asked for database storage. We'll use random ID from frontend or just push "anonymous".
        // Let's assume frontend sends { userId } or we just push a placeholder.
        const { userId } = req.body;

        if (story.likes.includes(userId)) {
            story.likes = story.likes.filter(id => id !== userId);
        } else {
            story.likes.push(userId || 'anonymous');
        }

        await story.save();
        res.json(story.likes);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   POST /api/stories/:id/comment
// @desc    Add comment
router.post('/:id/comment', async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        const { user, text } = req.body;

        const newComment = { user, text, date: new Date() };
        story.comments.unshift(newComment);

        await story.save();
        res.json(story.comments);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT /api/stories/:id/status
// @desc    Update story status (Admin)
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const story = await Story.findById(req.params.id);
        if (!story) return res.status(404).json({ message: 'Story not found' });

        story.status = status;
        await story.save();
        res.json(story);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }

        await story.deleteOne();
        res.json({ message: 'Story removed' });
    } catch (err) {
        console.error('Error deleting story:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
