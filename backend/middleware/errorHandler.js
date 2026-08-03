// Centralized error handler — catches anything passed to next(err)
function errorHandler(err, req, res, next) {
  console.error(err.stack);

  // Multer errors (bad file type, file too large)
  if (err.name === 'MulterError' || err.message === 'Only image files are allowed') {
    return res.status(400).json({ error: err.message });
  }

  // Prisma: record not found (e.g. update/delete on an id that doesn't exist)
  if (err.code === 'P2025') {
    return res.status(404).json({ error: 'Profile not found' });
  }

  // Prisma: unique constraint violation (e.g. duplicate email, if you add
  // a @unique rule to the schema later)
  if (err.code === 'P2002') {
    return res.status(409).json({ error: `A profile with that ${err.meta?.target?.[0] || 'value'} already exists` });
  }

  // Prisma: malformed query input (e.g. required field missing/wrong type)
  if (err.name === 'PrismaClientValidationError') {
    return res.status(400).json({ error: 'Invalid profile data' });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Something went wrong'
  });
}

module.exports = errorHandler;
