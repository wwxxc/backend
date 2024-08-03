const express = require('express');
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();
const getServices = require('../services/get-services')
const getServices2 = require('../services/get-services2');


router.post('/games', async (req, res) => {
    const { filter_type, filter_value } = req.body;
    const url = 'game-feature';
    const result = await getServices(filter_type, filter_value, url);
    res.json(result);
});

router.post('/prepaid', async (req, res) => {
    const { brand } = req.body;
    const url = 'prepaid';
    const result = await getServices2();
    const data = result.data
    const filteredData = data.filter(item => item.brand === brand && item.type === 'pulsa-reguler' && item.status === 'available');
    res.json(filteredData);
});



module.exports = router;