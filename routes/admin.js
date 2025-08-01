const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/adminController');
const { auth, admin } = require('../middlewares/auth');

router.get('/dashboard', [auth, admin], getDashboardData);

module.exports = router;