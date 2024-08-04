const expres = require('express');
const getOrder = require('../services/get-order');
const getStatusOrder = require('../services/get-status-order');
const router = expres.Router();

router.post('/add', async (req, res) => {
    const { code, id, server, kategori } = req.body;
    let url 
    if (kategori === 'Pulsa Data') {
        url = 'prepaid';
    } else {
        url = 'game-feature';
    }
    const result = await getOrder(code, id, server, url);
    res.json(result);
 })

router.post('/:id', async (req, res) => {
    const { id } = req.params;
    const { kategori } = req.body;
    let url 
    if (kategori === 'Pulsa Data') {
        url = 'prepaid';
    } else {
        url = 'game-feature';
    }
    const result = await getStatusOrder(id, url);
    res.json(result);
})


module.exports = router