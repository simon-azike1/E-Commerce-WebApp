const errorHandler = (err, req, res, next) => {
    console.error(err.stack || err);
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Server error';
  
    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
      statusCode = 404;
      message = `Resource not found`;
    }
  
    // Mongoose duplicate key
    if (err.code === 11000) {
      statusCode = 409;
      const field = Object.keys(err.keyValue)[0];
      message = `${field} already exists`;
    }
  
    // Mongoose validation error
    if (err.name === 'ValidationError') {
      statusCode = 400;
      message = Object.values(err.errors)
        .map((e) => e.message)
        .join(', ');
    }
  
    res.status(statusCode).json({
      success: false,
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  };
  
  // Wrap async controllers to avoid try/catch repetition
  const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  
  module.exports = { errorHandler, asyncHandler };
