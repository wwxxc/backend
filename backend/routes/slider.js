const express = require('express');
const router = express.Router();
const Slider = require('../models/Slider');

router.get('/', async (req, res) => {
    try {
        const sliders = await Slider.findAll();
        res.json(sliders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
