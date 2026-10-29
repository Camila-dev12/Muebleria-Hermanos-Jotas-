const dns = require('dns');
const mongoose = require('mongoose');

/**
 * Abre la conexión con MongoDB. Se llama una sola vez al iniciar el servidor.
 *
 * @param {string} uri - URI de conexión.
 * @param {string[]} [dnsServers] - DNS a usar para resolver la URI `mongodb+srv://`.
 *   Algunas redes en Windows rechazan esa consulta (error `querySrv ECONNREFUSED`);
 *   en ese caso se pueden indicar DNS públicos con la variable DNS_SERVERS.
 */
async function conectarDB(uri, dnsServers = []) {
  if (dnsServers.length > 0) {
    dns.setServers(dnsServers);
  }

  await mongoose.connect(uri);
  console.log(`Conectado a MongoDB (base: ${mongoose.connection.name})`);
}

module.exports = conectarDB;
