/**
 * Error con código de estado HTTP asociado.
 * Permite que cualquier capa señale un error "esperado" (400, 404...)
 * y delegue la construcción de la respuesta al error handler centralizado.
 */
class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }

  static badRequest(message) {
    return new HttpError(400, message);
  }

  static notFound(message) {
    return new HttpError(404, message);
  }
}

module.exports = HttpError;
