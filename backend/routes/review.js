const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// POST ulasan
router.post('/', async (req, res) => {
  try {
    const { no_invoice, product_name, item_name, nomor, rating, comment } = req.body;
    const review = await Review.create({ no_invoice, product_name, item_name, nomor, rating, comment });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

// GET ulasan berdasarkan produk
router.get('/:productId', async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { productId: req.params.productId },
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

// GET ulasan berdasarkan invoice
router.get('/invoice/:id', async (req, res) => {
  try {
    const reviews = await Review.findOne({
      where: { no_invoice: req.params.id },
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

module.exports = router;
