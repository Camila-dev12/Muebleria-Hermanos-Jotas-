const HttpError = require('../errors/HttpError');

const PAGINA_POR_DEFECTO = 1;
const LIMITE_POR_DEFECTO = 10;
const LIMITE_MAXIMO = 50;

const ENTERO_POSITIVO = /^[1-9]\d*$/;

/**
 * Convierte un query param en entero positivo.
 * Ausente -> valor por defecto. Presente pero inválido -> HttpError 400.
 */
function parsearEnteroPositivo(valor, nombre, valorPorDefecto) {
  if (valor === undefined) return valorPorDefecto;

  if (typeof valor !== 'string' || !ENTERO_POSITIVO.test(valor)) {
    throw HttpError.badRequest(`El parámetro '${nombre}' debe ser un entero positivo`);
  }

  return Number(valor);
}

/**
 * Lee y valida `page` y `limit` desde req.query.
 * @returns {{ page: number, limit: number, offset: number }}
 */
function parsearPaginacion(query) {
  const page = parsearEnteroPositivo(query.page, 'page', PAGINA_POR_DEFECTO);
  const limit = parsearEnteroPositivo(query.limit, 'limit', LIMITE_POR_DEFECTO);

  if (limit > LIMITE_MAXIMO) {
    throw HttpError.badRequest(`El parámetro 'limit' no puede superar ${LIMITE_MAXIMO}`);
  }

  return { page, limit, offset: (page - 1) * limit };
}

/**
 * Arma los metadatos de paginación que acompañan a la respuesta.
 */
function construirMetadatos({ page, limit }, totalItems) {
  const totalPages = Math.ceil(totalItems / limit);

  return {
    page,
    limit,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

module.exports = {
  parsearPaginacion,
  construirMetadatos,
};
