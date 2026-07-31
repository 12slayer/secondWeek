// Centralized error handler — catches anything passed to next(err)
function errorHandler(err, req, res, next) {
  console.error(err.stack);

  // Mongoose throws this when an :id in the URL isn't a valid ObjectId format
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid item id format' });
  }

  // Mongoose validation errors (e.g. required field missing)
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Something went wrong'
  });
}

module.exports = errorHandler;
