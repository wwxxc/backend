const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/list', async (req, res) => {
        const apiKey = process.env.TRIPAY_API_KEY;

        const paymentMethodResponse = await axios.get('https://tripay.co.id/api/merchant/payment-channel', {
            headers: { 'Authorization': 'Bearer ' + apiKey },
            validateStatus: function (status) {
                return status < 999; // ignore http error
            },
        });
        console.log(paymentMethodResponse);
        if(paymentMethodResponse.status == 200){
            res.json(paymentMethodResponse.data.data)
        }
})

module.exports = router