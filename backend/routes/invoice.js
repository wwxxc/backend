const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');
const crypto = require('crypto');
const axios = require('axios');

function addThousandSeparators(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const TRIPAY_API_KEY = process.env.TRIPAY_API_KEY;
  const TRIPAY_PRIVATE_KEY = process.env.TRIPAY_PRIVATE_KEY;
  const TRIPAY_MERCHANT_CODE = process.env.TRIPAY_MERCHANT_CODE
  const TRIPAY_MERCHANT_REFF = process.env.TRIPAY_MERCHANT_REFF
  const APP_NAME = process.env.APP_NAME

router.post('/add', async (req, res) => {
    const merchant_ref = TRIPAY_MERCHANT_REFF
    const customer_name = `customer ${APP_NAME}`
    const customer_email = `customer@${APP_NAME}.com`
    const refid = crypto.randomBytes(4).toString('hex');
    const status_transaksi = 'Pending'
    try {
        const { amount, produk, item, method, customer_phone, username, userid, userserver, payment_grup, nomor_whatsapp, kode_game, kategori } = req.body;

        const expiry = Math.floor(Date.now() / 1000) + 3600;
        var signature = crypto.createHmac('sha256', TRIPAY_PRIVATE_KEY)
        .update(TRIPAY_MERCHANT_CODE + merchant_ref + amount)
        .digest('hex');

        const order = {
            method,
            amount,
            produk,
            item,
            merchant_ref,
            customer_name,
            customer_email,
            customer_phone,
            order_items: [
                {
                    sku: produk,
                    name: item,
                    price: amount,
                    quantity: 1,
                    product_url: 'https://tokokamu.com/product/nama-produk-1',
                    image_url: 'https://tokokamu.com/product/nama-produk-1.jpg',
                }
            ],
            expired_time: expiry,
            signature
        };

        const response = await axios.post('https://tripay.co.id/api/transaction/create', order, {
            headers: { 'Authorization': `Bearer ${TRIPAY_API_KEY}` }
        });

        if (response.data.success) {
            const order_detail = {
                no_invoice: response.data.data.reference,
                no_refid: refid,
                status_pembayaran: response.data.data.status,
                produk,
                status_transaksi,
                item,
                harga: addThousandSeparators(response.data.data.amount),
                username,
                userid,
                userserver,
                method,
                payment: response.data.data.payment_name,
                payment_grup,
                nomor_whatsapp,
                response_tripay: JSON.stringify(response.data),
                kode_game,
                kategori
            };

            await Invoice.create(order_detail);

            res.json({
                status: true,
                pesan: "Berhasil order",
                data: response.data,
                info: order_detail
            });
        } else {
            res.status(400).json({
                status: false,
                pesan: "Gagal order",
                data: response.data
            });
        }
    } catch (error) {
        console.error("Error creating order", error.response);
        res.status(500).json({
            status: false,
            pesan: `Error creating order: ${error.message}`,
            data: error.response
        });
    }
})

router.post('/:id', async (req, res) => {
    try {
        const data = await Invoice.findOne({ where : { id : req.params.id }})
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


module.exports = router