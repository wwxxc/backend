const express = require('express');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    // Fetch user information and transactions from the database
    const user = await User.findByPk(req.userId);
    const transactions = await Transaction.findAll({ where: { UserId: req.userId } });

    // Render the dashboard template and pass user data to it
    res.render('dashboard', { user, transactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;