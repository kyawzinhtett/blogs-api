const express = require('express');
const {
  getALLPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/blogController');

const router = express.Router();

router.route('/').get(getALLPosts).post(createPost);
router.route('/:id').get(getPost).patch(updatePost).delete(deletePost);

module.exports = router;
