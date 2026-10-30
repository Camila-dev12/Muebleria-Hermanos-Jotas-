const Product = require('../models/Product');

/**
 * Único punto de acceso a los datos de productos (MongoDB vía Mongoose).
 * El controller no conoce Mongoose: si cambia la persistencia, solo cambia este módulo.
 * Las funciones que buscan por id devuelven null si el producto no existe.
 */

function contarTodos() {
  return Product.countDocuments();
}

function obtenerPagina(offset, limit) {
  // Orden por _id = orden de creación, para que la paginación sea estable.
  return Product.find().sort({ _id: 1 }).skip(offset).limit(limit).lean();
}

function obtenerPorId(id) {
  return Product.findById(id).lean();
}

async function crear(datos) {
  const producto = await Product.create(datos);
  return producto.toObject();
}

function actualizar(id, datos) {
  return Product.findByIdAndUpdate(id, datos, {
    returnDocument: 'after',
    runValidators: true,
  }).lean();
}

function eliminar(id) {
  return Product.findByIdAndDelete(id).lean();
}

module.exports = {
  contarTodos,
  obtenerPagina,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
};
