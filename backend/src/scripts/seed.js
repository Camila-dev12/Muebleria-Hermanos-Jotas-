/**
 * Carga los productos iniciales (src/data/productos.js) en MongoDB.
 *
 * Uso:
 *   npm run seed            -> carga los productos solo si la colección está vacía.
 *   npm run seed -- --reset -> borra todos los productos y vuelve a cargarlos.
 */
const mongoose = require('mongoose');
const { MONGODB_URI, DNS_SERVERS } = require('../config/env');
const conectarDB = require('../config/db');
const Product = require('../models/Product');
const productos = require('../data/productos');

async function seed() {
  const reset = process.argv.includes('--reset');

  await conectarDB(MONGODB_URI, DNS_SERVERS);

  const existentes = await Product.countDocuments();

  if (existentes > 0 && !reset) {
    console.log(
      `La colección ya tiene ${existentes} productos. No se cargó nada.\n` +
        'Para borrarlos y volver a cargar los iniciales: npm run seed -- --reset'
    );
    return;
  }

  if (reset) {
    const { deletedCount } = await Product.deleteMany({});
    console.log(`Se borraron ${deletedCount} productos.`);
  }

  // El id numérico se descarta: MongoDB genera el _id de cada producto.
  const documentos = productos.map(({ id, ...producto }) => producto);
  const insertados = await Product.insertMany(documentos);

  console.log(`Se cargaron ${insertados.length} productos.`);
}

seed()
  .catch((error) => {
    console.error('Error al cargar los productos:', error.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
