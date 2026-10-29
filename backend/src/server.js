const { PORT, MONGODB_URI, DNS_SERVERS } = require('./config/env');
const conectarDB = require('./config/db');
const app = require('./app');

async function iniciar() {
  try {
    await conectarDB(MONGODB_URI, DNS_SERVERS);
  } catch (error) {
    console.error('No se pudo conectar a MongoDB:', error.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

iniciar();
