const express = require('express');
const router = express.Router();
const { getCourses, createCourse } = require('../controllers/courseController');
const { auth, admin } = require('../middlewares/auth');

router.get('/', getCourses);
router.post('/', [auth, admin], createCourse);

module.exports = router;