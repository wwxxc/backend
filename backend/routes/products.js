const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
        include: [
          {
            model: Category,
            attributes: ['Category_name'], 
          },
        ],
      });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a product by slug
router.post('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ where: { product_slug: req.params.id },
        include: [
            {
              model: Category,
              attributes: ['Category_name'], 
            },
          ], 
        });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ where: { product_slug: req.params.id } });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const updatedProduct = await product.update(req.body);
    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
      const product = await Product.findOne({ where: { product_slug: req.params.id } });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      await product.destroy();
      res.status(204).end(); // No content to send back
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;
