const productosRepository = require('../data/productosRepository');
const HttpError = require('../errors/HttpError');
const { parsearPaginacion, construirMetadatos } = require('../utils/pagination');

const OBJECT_ID_VALIDO = /^[0-9a-fA-F]{24}$/;

function validarId(id) {
  if (!OBJECT_ID_VALIDO.test(id)) {
    throw HttpError.badRequest("El parámetro 'id' no es un id válido");
  }
}

/**
 * Devuelve el cuerpo de la petición sin `_id` (lo genera MongoDB y no se puede modificar).
 * Rechaza cuerpos vacíos o que no sean un objeto JSON (por ejemplo, un array).
 */
function leerCuerpo(req) {
  const cuerpo = req.body;

  if (!cuerpo || typeof cuerpo !== 'object' || Array.isArray(cuerpo)) {
    throw HttpError.badRequest('El cuerpo de la petición debe ser un objeto JSON');
  }

  const { _id, ...datos } = cuerpo;
  return datos;
}

function noEncontrado(id) {
  return HttpError.notFound(`No existe un producto con id ${id}`);
}

/**
 * GET /api/productos?page=&limit=
 */
async function listarProductos(req, res) {
  const paginacion = parsearPaginacion(req.query);

  const [productos, totalItems] = await Promise.all([
    productosRepository.obtenerPagina(paginacion.offset, paginacion.limit),
    productosRepository.contarTodos(),
  ]);

  res.status(200).json({
    data: productos,
    pagination: construirMetadatos(paginacion, totalItems),
  });
}

/**
 * GET /api/productos/:id
 */
async function obtenerProducto(req, res) {
  const { id } = req.params;
  validarId(id);

  const producto = await productosRepository.obtenerPorId(id);
  if (!producto) throw noEncontrado(id);

  res.status(200).json({ data: producto });
}

/**
 * POST /api/productos
 */
async function crearProducto(req, res) {
  const producto = await productosRepository.crear(leerCuerpo(req));
  res.status(201).json({ data: producto });
}

/**
 * PUT /api/productos/:id
 */
async function actualizarProducto(req, res) {
  const { id } = req.params;
  validarId(id);

  const producto = await productosRepository.actualizar(id, leerCuerpo(req));
  if (!producto) throw noEncontrado(id);

  res.status(200).json({ data: producto });
}

/**
 * DELETE /api/productos/:id
 */
async function eliminarProducto(req, res) {
  const { id } = req.params;
  validarId(id);

  const producto = await productosRepository.eliminar(id);
  if (!producto) throw noEncontrado(id);

  res.status(200).json({ data: producto });
}

module.exports = {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
