/**
 * Manejador de errores centralizado (firma de 4 argumentos de Express).
 *
 * - Errores con `status` 4xx (HttpError propios o los de express.json(),
 *   como un JSON mal formado) se devuelven con su mensaje.
 * - Cualquier otro error se considera inesperado: se loguea y se responde
 *   500 con un mensaje genérico para no exponer detalles internos.
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const status = err.status ?? err.statusCode;
  const esErrorDeCliente = Number.isInteger(status) && status >= 400 && status < 500;

  if (!esErrorDeCliente) {
    console.error(err);
  }

  const statusFinal = esErrorDeCliente ? status : 500;
  const message = esErrorDeCliente ? err.message : 'Error interno del servidor';

  res.status(statusFinal).json({
    error: { status: statusFinal, message },
  });
}

module.exports = errorHandler;
