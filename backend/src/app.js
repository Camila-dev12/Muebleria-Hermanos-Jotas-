const path = require('path');
const express = require('express');
const cors = require('cors');
const { CORS_ORIGINS } = require('./config/env');
const apiRouter = require('./routes');
const logger = require('./middlewares/logger');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares globales
app.use(logger);
// CORS: en producción el frontend (Vercel) y la API (Render) están en dominios distintos.
// Con CORS_ORIGINS definida solo se aceptan esos orígenes; sin definir, se acepta cualquiera.
app.use(cors(CORS_ORIGINS.length > 0 ? { origin: CORS_ORIGINS } : undefined));
app.use(express.json());

// Imágenes de productos (carpeta assets/ en backend/public/)
app.use('/assets', express.static(path.join(__dirname, '..', 'public', 'assets')));

// Rutas
app.use('/api', apiRouter);

// Manejo de errores (siempre al final)
app.use(notFound);
app.use(errorHandler);

module.exports = app;
