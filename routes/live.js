const express = require('express');
const router = express.Router();
const { getClasses, createClass } = require('../controllers/liveClassController');
const { auth, admin } = require('../middlewares/auth');

router.get('/', getClasses);
router.post('/', [auth, admin], createClass);

module.exports = router;