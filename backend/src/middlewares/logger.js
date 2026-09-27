/**
 * Registra método HTTP y URL de cada petición entrante.
 */
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = logger;
