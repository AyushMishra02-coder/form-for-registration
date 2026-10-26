export function errorHandler(error, _req, res, _next) {
  console.error(error);
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).json({ message: error.message });
  }
  if (error.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ message: 'Team logo must be 2 MB or smaller.' });
  if (error.code === 'LIMIT_UNEXPECTED_FILE') return res.status(400).json({ message: 'Only one team logo can be uploaded.' });
  res.status(error.status || 500).json({ message: error.message || 'Something went wrong. Please try again.' });
}
