const express = require('express');
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();
const getServices = require('../services/get-services');

router.post('/games', async (req, res) => {
    const { filter_type, filter_value } = req.body;
    const url = 'game-feature';
    const result = await getServices(filter_type, filter_value, url);
    res.json(result);
});

router.post('/prepaid', async (req, res) => {
    const { filter_type, filter_value } = req.body;
    const url = 'prepaid';
    const result = await getServices(filter_type, filter_value, url);
    res.json(result);
});



module.exports = router;