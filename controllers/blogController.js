const { StatusCodes } = require('http-status-codes');
const Blog = require('../models/Blog');
const { BadRequestError, NotFoundError } = require('../errors');

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
  if (!post) {
    throw new NotFoundError(`No post found with this id: ${postID}`);
  }
  res.status(StatusCodes.OK).json({ post });
};

const createPost = async (req, res) => {
  req.body.author = req.user.userID;
  const post = await Blog.create(req.body);
  res.status(StatusCodes.CREATED).json({ post });
};

const updatePost = async (req, res) => {
  const {
    body: { title, description },
    user: { userID },
    params: { id: postID },
  } = req;

  if (!title || !description) {
    throw new BadRequestError('Title or description cannot be empty');
  }

  const post = await Blog.findOneAndUpdate(
    { _id: postID, author: userID },
    req.body,
    { new: true, runValidators: true }
  );

  if (!post) {
    throw new NotFoundError(`No post found with this id: ${postID}`);
  }

  res.status(StatusCodes.OK).json({ post });
};

const deletePost = async (req, res) => {
  const {
    user: { userID },
    params: { id: postID },
  } = req;

  const post = await Blog.findOneAndRemove({ _id: postID, author: userID });

  if (!post) {
    throw new NotFoundError(`No post found with this id: ${postID}`);
  }

  res.status(StatusCodes.NO_CONTENT).send();
};

module.exports = { getALLPosts, getPost, createPost, updatePost, deletePost };
