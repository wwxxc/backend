const express = require('express');
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

router.post('/vip-resellerr', async (req, res) => {
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


router.post('/check-game', async (req, res) => {
    const vip_ApiId = process.env.VIP_API_ID;
    const vip_APiKey = process.env.VIP_API_KEY;

    var sign = crypto.createHash('md5')
        .update(vip_ApiId + vip_APiKey)
        .digest('hex');
    
        var FormData = require('form-data');
        var data = new FormData();
        data.append('key', vip_APiKey);
        data.append('sign', sign);
        data.append('type', 'get-nickname');
        data.append('code', req.body.code);
        data.append('target', req.body.id);
        data.append('additional_target', req.body.server);
    
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
                res.json({
                    status: true,
                    data: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    });

module.exports = router