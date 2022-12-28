const { StatusCodes } = require('http-status-codes');
const Blog = require('../models/Blog');

const getALLPosts = async (req, res) => {
  const posts = await Blog.find({ author: req.user.userID }).sort('-createdAt');
  res.status(StatusCodes.OK).json({ count: posts.length, posts });
};

const getPost = async (req, res) => {
  const {
    user: { userID },
    params: { id: postID },
  } = req;

  const post = await Blog.findOne({ _id: postID, author: userID });
  res.status(StatusCodes.OK).json({ post });
};

const createPost = async (req, res) => {
  req.body.author = req.user.userID;
  const post = await Blog.create(req.body);
  res.status(StatusCodes.CREATED).json({ post });
};

const updatePost = async (req, res) => {
  res.send('Update Post');
};

const deletePost = async (req, res) => {
  res.send('Delete Post');
};

module.exports = { getALLPosts, getPost, createPost, updatePost, deletePost };
