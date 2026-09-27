const productosRepository = require('../data/productosRepository');
const HttpError = require('../errors/HttpError');
const { parsearPaginacion, construirMetadatos } = require('../utils/pagination');

const ID_VALIDO = /^[1-9]\d*$/;

/**
 * GET /api/productos?page=&limit=
 */
function listarProductos(req, res) {
  const paginacion = parsearPaginacion(req.query);

  const productos = productosRepository.obtenerPagina(paginacion.offset, paginacion.limit);
  const totalItems = productosRepository.contarTodos();

  res.status(200).json({
    data: productos,
    pagination: construirMetadatos(paginacion, totalItems),
  });
}

/**
 * GET /api/productos/:id
 */
function obtenerProducto(req, res) {
  const { id } = req.params;

  if (!ID_VALIDO.test(id)) {
    throw HttpError.badRequest("El parámetro 'id' debe ser un entero positivo");
  }

  const producto = productosRepository.obtenerPorId(Number(id));

  if (!producto) {
    throw HttpError.notFound(`No existe un producto con id ${id}`);
  }

  res.status(200).json({ data: producto });
}

module.exports = {
  listarProductos,
  obtenerProducto,
};
