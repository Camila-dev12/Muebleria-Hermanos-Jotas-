const productos = require('./productos');

/**
 * Único punto de acceso a los datos de productos.
 * Hoy lee un array en memoria; si mañana se migra a una base de datos,
 * solo cambia este módulo y el controller permanece igual.
 */

function contarTodos() {
  return productos.length;
}

function obtenerPagina(offset, limit) {
  return productos.slice(offset, offset + limit);
}

function obtenerPorId(id) {
  return productos.find((producto) => producto.id === id) ?? null;
}

module.exports = {
  contarTodos,
  obtenerPagina,
  obtenerPorId,
};
