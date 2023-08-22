//configuracion de rutas del controladar producto

var express = require('express');
var productController = require('../controllers/producto');
var multipar = require('connect-multiparty');
var multipartMiddleware = multipar({uploadDir:'./uploads'});



////

var router = express.Router();

router.get('/home',productController.home);
router.post('/test',productController.test);
router.post('/save-product',productController.saveProduct);
router.get('/productos',productController.getProductos);
router.get('/producto/:id',productController.getProducto);
router.put('/producto/:id',productController.UpdateProduct);
router.delete('/producto/:id',productController.deleteProject);
router.post('/uploadImage/:id',multipartMiddleware, productController.uploadImage);
router.get('/get-image/:image', productController.getImageFile);
router.get('/prod-categoria/:nombre',productController.getProductoCategory);



module.exports = router;