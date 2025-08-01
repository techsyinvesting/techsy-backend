const express = require('express');
const router = express.Router();
const { getBlogs, createBlog } = require('../controllers/blogController');
const { auth } = require('../middlewares/auth');

router.get('/', getBlogs);
router.post('/', auth, createBlog);

module.exports = router;