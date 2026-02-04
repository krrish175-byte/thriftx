const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAIPriceRecommendation, getChatbotResponse } = require('../services/geminiAI');

// @route   POST api/ai/price-check
// @desc    Get AI price recommendation
// @access  Private
router.post('/price-check', auth, async (req, res) => {
    try {
        const recommendation = await getAIPriceRecommendation(req.body);
        if (!recommendation) {
            return res.status(500).json({ msg: 'AI Service Unavailable' });
        }
        res.json(recommendation);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/ai/chat
// @desc    Chat with AI assistant
// @access  Public (or semi-private)
router.post('/chat', async (req, res) => {
    try {
        const { message, context } = req.body;
        const response = await getChatbotResponse(message, context || {});
        res.json({ response });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
