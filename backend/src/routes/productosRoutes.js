const { Router } = require('express');
const { listarProductos, obtenerProducto } = require('../controllers/productosController');

const router = Router();

router.get('/', listarProductos);
router.get('/:id', obtenerProducto);

module.exports = router;
