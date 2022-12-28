const User = require('../models/User');

const register = async (req, res, next) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res.status(201).json({
    user: { name: user.name },
    token,
  });
};

const login = async (req, res) => {
  res.send('Login User');
};

module.exports = { register, login };
