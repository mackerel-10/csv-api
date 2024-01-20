class CustomError extends Error {
  statusCode;

  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode | 500;

  return res.status(statusCode).json({
    ...err,
  });
};

module.exports = { CustomError, errorHandler };
