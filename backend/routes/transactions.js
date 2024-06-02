const express = require('express');
const { Transaction, User } = require('../models');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();


router.post('/', async (req, res) => {
  const { amount, status } = req.body;
  const userId = req.userId || null;

  try {
    const transaction = await Transaction.create({ amount, status, UserId: userId });
    res.json({ transaction });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/history', authenticate, async (req, res) => {
  try {
    const transactions = await Transaction.findAll({ where: { UserId: req.userId } });
    res.json({ transactions });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
