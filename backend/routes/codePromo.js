const express = require('express');
const router = express.Router();
const {PromoCode, PromoUsage} = require('../models/PromoCode');

router.post('/', async (req,res) => {
    try {
        const { code, id, server, productCode, productPrice } = req.body;
        const promo = await PromoCode.findOne({ where: { code: code, product_code: productCode } });
        if(!promo) {
            res.status(404).json({
                status: false,
                message: 'Promo code not found',
            })
        } else {
            const data = await PromoUsage.findOne({ where: { user_id: id } });
            if(data) {
                res.status(200).json({
                    status: false,
                    message: 'Promo code already used',
                })
            } else {
                const insert = await PromoUsage.create({ user_id: id, server_id: server, promo_code: code });
                res.status(200).json({
                    status: true,
                    message: 'Promo code successfully used',
                    data: insert
                })
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;