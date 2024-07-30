const express = require('express');
const router = express.Router();
const {PromoCode, PromoUsage} = require('../models/PromoCode');

router.post('/apply', async (req,res) => {
    try {
        const { code, id, server, username, productCode, productPrice } = req.body;
        const promo = await PromoCode.findOne({ where: { code: code, product_code: productCode } });
        if(!promo) {
            res.status(200).json({
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
                res.status(200).json({
                    status: true,
                    message: 'Promo code has success generated',
                    data: {
                        code: promo.code,
                        discount: promo.discount,
                        productCode: productCode,
                        productPrice: productPrice,
                        productNewPrice: Math.round(productPrice - productPrice * (promo.discount / 100)),
                    }
                })
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;