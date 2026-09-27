const HttpError = require('../errors/HttpError');

/**
 * Se ejecuta solo si ninguna ruta respondió.
 * No arma la respuesta: delega en el error handler para mantener un único formato.
 */
function notFound(req, res, next) {
  next(HttpError.notFound(`Ruta no encontrada: ${req.method} ${req.originalUrl}`));
}

module.exports = notFound;
