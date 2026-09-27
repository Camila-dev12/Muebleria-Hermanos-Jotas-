const { Router } = require('express');
const productosRoutes = require('./productosRoutes');

/**
 * Router raíz de la API. Cada recurso se monta sobre su propio prefijo.
 */
const apiRouter = Router();

apiRouter.use('/productos', productosRoutes);

module.exports = apiRouter;
