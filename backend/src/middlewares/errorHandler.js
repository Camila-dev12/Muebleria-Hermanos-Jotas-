const mongoose = require('mongoose');

/**
 * Traduce un error de validación de Mongoose a un mensaje legible.
 * Si un campo no se pudo convertir al tipo esperado (ej. precio: "abc"),
 * Mongoose devuelve un mensaje técnico en inglés; lo reemplazamos.
 */
function mensajeDeCasteo(error) {
  return `El campo '${error.path}' tiene un valor inválido`;
}

function mensajeDeValidacion(err) {
  return Object.values(err.errors)
    .map((error) => (error instanceof mongoose.Error.CastError ? mensajeDeCasteo(error) : error.message))
    .join('. ');
}

/**
 * Devuelve el mensaje para los errores de datos inválidos (400), o null si no lo es.
 * - ValidationError: falla una validación del schema (al crear o actualizar).
 * - CastError: un valor no se puede convertir al tipo del campo (al actualizar).
 * - entity.parse.failed: express.json() recibió un JSON mal formado.
 */
function mensajeDeDatosInvalidos(err) {
  if (err instanceof mongoose.Error.ValidationError) return mensajeDeValidacion(err);
  if (err instanceof mongoose.Error.CastError) return mensajeDeCasteo(err);
  if (err.type === 'entity.parse.failed') return 'El cuerpo de la petición no es un JSON válido';
  return null;
}

/**
 * Manejador de errores centralizado (firma de 4 argumentos de Express).
 *
 * - Datos inválidos (validación o tipos de Mongoose, JSON mal formado) se responden
 *   como 400 con un mensaje en español.
 * - Otros errores con `status` 4xx (como los HttpError propios) se devuelven con su mensaje.
 * - Cualquier otro error se considera inesperado: se loguea y se responde
 *   500 con un mensaje genérico para no exponer detalles internos.
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const mensajeInvalido = mensajeDeDatosInvalidos(err);
  if (mensajeInvalido) {
    return res.status(400).json({
      error: { status: 400, message: mensajeInvalido },
    });
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
