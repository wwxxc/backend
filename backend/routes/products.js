const expres = require('express');
const router = expres.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/:id', async (req, res) => {
    try {
        const products = await Product.findOne({ where: { product_slug: req.params.id } });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;