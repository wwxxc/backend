const express = require('express');
const router = express.Router();
const {PromoCode, PromoUsage} = require('../models/PromoCode');

router.post('/apply', async (req,res) => {
    try {
        const { code, id, productCode, productPrice } = req.body;
        const promo = await PromoCode.findOne({ where: { code: code, product_code: productCode } });
        if(!promo) {
            res.status(200).json({
                status: false,
                message: 'Promo code not found',
            })
        } else {
            const data = await PromoUsage.findOne({ where: { user_id: id } });
            const data_max = await PromoUsage.findAll({ where: { promo_code: promo.code } });
            if(data) {
                res.status(200).json({
                    status: false,
                    message: 'Promo code already used',
                })
            } else if(data_max.length >= promo.max_usage) {
                res.status(200).json({
                    status: false,
                    message: `Promo code has reached maximum usage (${data_max.length}/${promo.max_usage})`,
                })
            } else {
                res.status(200).json({
                    status: true,
                    message: 'Promo code has been successfully applied',
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