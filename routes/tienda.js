'use strict'
var express = require('express');
var ProductoController = require('../controllers/tienda');

//aqui definimos las rutas de la app
var router = express.Router();

//para subir archivos tipo multipart/form-data
var multipart = require('connect-multiparty');
var multiPartMiddleware = multipart({ uploadDir: './uploads' });

//pagina de inicio
router.get('/home', ProductoController.home);

//guardar info del producto
router.post('/guardar-producto', ProductoController.saveProducto);

//mostrar todos los productos
router.get('/productos', ProductoController.getProductos);

//obtener un producto por ID
router.get('/producto/:id', ProductoController.getProducto);

//eliminar producto por ID
router.delete('/producto/:id', ProductoController.deleteProducto);

//actualizar producto
router.put('/producto/:id', ProductoController.updateProducto);

//subir imagen al producto
router.post('/subir-imagen/:id', multiPartMiddleware, ProductoController.uploadImagen);

//cargar imagen del servidor
router.get('/get-imagen/:imagen', ProductoController.getImagen);

//ver lista de administradores
router.get('/administradores', ProductoController.getAdministradores);

//ver lista de clientes
router.get('/clientes', ProductoController.getClientes);


//exportamos las rutas para poder usarlas en app.js
module.exports = router;
