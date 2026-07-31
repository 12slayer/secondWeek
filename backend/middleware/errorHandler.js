// Centralized error handler — catches anything passed to next(err)
function errorHandler(err, req, res, next) {
  console.error(err.stack);

  // Multer errors (bad file type, file too large)
  if (err.name === 'MulterError' || err.message === 'Only image files are allowed') {
    return res.status(400).json({ error: err.message });
  }

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
