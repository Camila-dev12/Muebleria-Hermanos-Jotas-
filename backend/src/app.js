const express = require('express');
const apiRouter = require('./routes');
const logger = require('./middlewares/logger');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares globales
app.use(logger);
app.use(express.json());

// Rutas
app.use('/api', apiRouter);

// Manejo de errores (siempre al final)
app.use(notFound);
app.use(errorHandler);

module.exports = app;
