const errorHandler = (err, req, res, next) => {
  const statuscode = res.statuscode ? res.statuscode : 500;

  if (res.headersSent) {
    return next(err);
  }

  res.status(statuscode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

module.exports = errorHandler;
