const express = require('express');
const router = express.Router();
const { getWallet, buyStock, sellStock } = require('../controllers/walletController');
const { auth } = require('../middlewares/auth');

router.get('/', auth, getWallet);
router.post('/buy', auth, buyStock);
router.post('/sell', auth, sellStock);

module.exports = router;