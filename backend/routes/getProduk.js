const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    const API_URL = process.env.API_URL;
    console.log(API_URL);
    try {
        const data = await axios.get('/game-feature');
        console.log(data);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;