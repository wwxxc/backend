const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');
const crypto = require('crypto');
const axios = require('axios');
const generateInvoice = require('../utils/generateInvoice')

function addThousandSeparators(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const TRIPAY_API_KEY = process.env.TRIPAY_API_KEY;
  const TRIPAY_PRIVATE_KEY = process.env.TRIPAY_PRIVATE_KEY;
  const TRIPAY_MERCHANT_CODE = process.env.TRIPAY_MERCHANT_CODE
  const APP_NAME = process.env.APP_NAME
  const BASE_URL = process.env.BASE_URL;

router.post('/add', async (req, res) => {
    const merchant_ref = generateInvoice('EPO', 8);
    const customer_name = `customer ${APP_NAME}`
    const customer_email = `customer@${APP_NAME}.com`
    const status_transaksi = 'Pending'
    const pesan = 'Menunggu pembayaran'
    try {
        const { amount, harga, produk, item, method, customer_phone, username, userid, userserver, payment_name, payment_code, payment_grup, nomor_whatsapp, kode_game, kategori } = req.body;
        console.log(customer_phone);
        const expiry = Math.floor(Date.now() / 1000) + 10800;
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
                no_refid: merchant_ref,
                status_pembayaran: response.data.data.status,
                produk,
                status_transaksi,
                item,
                harga: harga,
                username,
                userid,
                userserver,
                method,
                payment: response.data.data.payment_name,
                payment_name,
                payment_code,
                payment_grup,
                nomor_whatsapp,
                response_tripay: JSON.stringify(response.data),
                kode_game,
                pesan,
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
        const data = await Invoice.findOne({ where: { no_refid: req.params.id } });
        if (!data) {
            return res.status(404).json('Invoice not found');
        } else {
            const response = await axios.post(`${BASE_URL}/transactions/${data.no_trxid}`);
        if (response.data.data.result) {
            if (response.data.data.data[0].status === 'success') {
                await Invoice.update({ status_transaksi: 'Completed' }, {
                    where: { no_refid: req.params.id }
                });
            }
        }
    
        res.json(data);
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


module.exports = router