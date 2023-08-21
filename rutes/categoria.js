//configuracion de rutas del controladar producto

var express = require('express');
var categoryController = require('../controllers/categoria');
var multipar = require('connect-multiparty');
var multipartMiddleware = multipar({uploadDir:'./uploads'});



////

var router = express.Router();

router.get('/home-Category',categoryController.home);
router.post('/test-Category',categoryController.test);
router.get('/categoria/:id',categoryController.getCategoria);
router.get('/categorias',categoryController.getCategorias);
router.post('/save-category',categoryController.saveCategory);
router.delete('/categoria/:id',categoryController.deleteCategory);
router.put('/categoria/:id',categoryController.UpdateCategory);
/*
router.post('/save-product',productController.saveProduct);
router.get('/productos',productController.getProductos);
router.get('/producto/:id',productController.getProducto);
router.put('/producto/:id',productController.UpdateProduct);
router.delete('/producto/:id',productController.deleteProject);
router.post('/uploadImage/:id',multipartMiddleware, productController.uploadImage);
router.get('/get-image/:image', productController.getImageFile);
*/



module.exports = router;