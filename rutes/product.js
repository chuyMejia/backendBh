//configuracion de rutas del controladar producto

var express = require('express');
var productController = require('../controllers/producto');

////

var router = express.Router();

router.get('/home',productController.home);
router.post('/test',productController.test);
router.post('/save-product',productController.saveProduct);
router.get('/productos',productController.getProductos);


module.exports = router;