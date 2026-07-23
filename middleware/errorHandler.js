// Catches anything passed to next(err) and any uncaught sync errors
// in route handlers, so every response goes through one place.
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message || "Internal server error" });
}

module.exports = errorHandler;
