const path = require('path');
const dotenv = require('dotenv');

// Carga backend/.env (si existe). En producción (Render) las variables
// se definen en el panel del servicio y este archivo no existe.
dotenv.config({ path: path.join(__dirname, '..', '..', '.env'), quiet: true });

/**
 * Lee una variable de entorno obligatoria. Si falta, corta el arranque
 * con un mensaje claro en lugar de fallar más adelante.
 * Ningún otro módulo debería leer process.env directamente.
 */
function requerida(nombre) {
  const valor = process.env[nombre];

  if (!valor) {
    console.error(
      `Falta la variable de entorno ${nombre}. Copiá backend/.env.example a backend/.env y completala.`
    );
    process.exit(1);
  }

  return valor;
}

/**
 * Lista separada por comas (ej. "8.8.8.8,1.1.1.1"). Vacía si no se define.
 */
function lista(nombre) {
  return (process.env[nombre] || '')
    .split(',')
    .map((valor) => valor.trim())
    .filter(Boolean);
}

module.exports = {
  PORT: process.env.PORT || 3001,
  MONGODB_URI: requerida('MONGODB_URI'),
  DNS_SERVERS: lista('DNS_SERVERS'),
  // Sin barra final: el navegador envía el origen como "https://sitio.vercel.app".
  CORS_ORIGINS: lista('CORS_ORIGINS').map((origen) => origen.replace(/\/+$/, '')),
};
