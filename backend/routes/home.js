const expres = require('express');
const router = expres.Router();
const Home = require('../models/Home');

router.get('/', async (req, res) => {
    try {
        const home = await Home.findByPk(1);
        res.json(home);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;