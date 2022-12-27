const getALLPosts = async (req, res) => {
  res.send('Get All Posts');
};

const getPost = async (req, res) => {
  res.send('Get Single Post');
};

const createPost = async (req, res) => {
  res.send('Create Post');
};

const updatePost = async (req, res) => {
  res.send('Update Post');
};

const deletePost = async (req, res) => {
  res.send('Delete Post');
};

module.exports = { getALLPosts, getPost, createPost, updatePost, deletePost };
