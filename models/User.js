const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide username'],
    minLength: 3,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    validate: [validator.isEmail, 'Invalid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minLength: 6,
  },
});

module.exports = mongoose.model('User', UserSchema);
