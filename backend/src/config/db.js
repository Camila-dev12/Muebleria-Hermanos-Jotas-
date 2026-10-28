const mongoose = require('mongoose');

/**
 * Abre la conexión con MongoDB. Se llama una sola vez al iniciar el servidor.
 */
async function conectarDB(uri) {
  await mongoose.connect(uri);
  console.log(`Conectado a MongoDB (base: ${mongoose.connection.name})`);
}

module.exports = conectarDB;
