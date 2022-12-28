const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

// Hashed Password
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Create JWT
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { name: this.name, userID: this._id },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

// Check Password
UserSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
