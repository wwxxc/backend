const express = require('express');
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

router.post('/akun', async (req, res) => {
    var API_ID = VIP_API_ID
    var API_KEY = VIP_API_KEY

    var sign = crypto.createHash('md5')
        .update(API_ID + API_KEY)
        .digest('hex');

    var axios = require('axios');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('key', API_KEY);
    data.append('sign', sign);


    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://vip-reseller.co.id/api/profile',
        headers: {
            ...data.getHeaders()
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            res.json({
                status: true,
                data: response.data.data
            })
        })
        .catch(function (error) {
            console.log(error);
        });
})

router.post('/games', async (req, res) => {
    const API_URL = process.env.API_URL;
    const vip_ApiId = process.env.VIP_API_ID;
    const vip_APiKey = process.env.VIP_API_KEY;

    var sign = crypto.createHash('md5')
        .update(vip_ApiId + vip_APiKey)
        .digest('hex');

    var FormData = require('form-data');
    var data = new FormData();
    data.append('key', vip_APiKey);
    data.append('sign', sign);
    data.append('type', 'services');
    data.append('filter_type', req.body.filter_type);
    data.append('filter_value', req.body.filter_value);
    data.append('filter_status', 'available');

    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://vip-reseller.co.id/api/game-feature',
        headers: {
            ...data.getHeaders()
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            const filteredData = response.data.data.filter(item => item.price.basic <= 30000 && item.price.basic > 1000);
            const formattedData = filteredData.map(item => ({
                ...item,
                normal_price: {
                    ...item.price,
                    basic: item.price.basic,
                    premium: item.price.premium,
                    special: item.price.special
                },
                price: {
                    ...item.price,
                    basic: item.price.basic.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        maximumFractionDigits: 0
                    }),
                    premium: item.price.premium.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        maximumFractionDigits: 0
                    }),
                    special: item.price.special.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        maximumFractionDigits: 0
                    })
                }
            }));
            res.json({
                status: true,
                data: formattedData
            })
        })
        .catch(function (error) {
            res.json({
                status: false,
                data: error
            })
        });
});


router.post('/prepaid', async (req, res) => {
    const API_URL = process.env.API_URL;
    const VIP_API_ID = process.env.API_ID_VIP;
    const VIP_API_KEY = process.env.API_KEY_VIP;
    var API_ID = VIP_API_ID
    var API_KEY = VIP_API_KEY

    var sign = crypto.createHash('md5')
        .update(API_ID + API_KEY)
        .digest('hex');

    var FormData = require('form-data');
    var data = new FormData();
    data.append('key', API_KEY);
    data.append('sign', sign);
    data.append('type', 'services');
    data.append('filter_type', req.body.filter_type);
    data.append('filter_value', req.body.filter_value);
    data.append('filter_status', 'available');

    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://vip-reseller.co.id/api/game-feature',
        headers: {
            ...data.getHeaders()
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            res.json({
                status: true,
                data: response.data
            })
        })
        .catch(function (error) {
            console.log(error);
        });
});



module.exports = router;