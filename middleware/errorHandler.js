const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, please try again later!',
  };

  // Validation Error
  if (err.name === 'ValidationError') {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',');
  }

  // Cast Error
  if (err.name === 'CastError') {
    customError.statusCode = StatusCodes.NOT_FOUND;
    customError.msg = `No post found with this id: ${err.value}`;
  }

  // Duplicate Key
  if (err.code || err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandler;
