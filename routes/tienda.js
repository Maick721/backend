'use-strict'
var express=require('express');
var ProductController=require('../controllers/tienda');

//define rutas esspecificas dentro de la aplicacion 
var router=express.Router();

//subir el archivo multipart/form-data
var multipart=require('connect-multiparty');
var multiPartMiddleware=multipart({uploadDir:'./uploads'});

//pagina de inicio
router.get('/home', ProductController.home);

//guardar informaacion de prodcuto}
router.post('/guardar-producto', ProductController.saveProducto);

//ver indormacion de los productos
router.get('/productos', ProductController.getProductos);

//obtener datos de un producto

router.get('/producto/:id', ProductController.getProducto);

//eliminar prodcuto

router.delete('/producto/:id', ProductController.deleteProducto);

//ACTUALIZAR PRODUCTO

router.put('/producto/:id', ProductController.updateProducto);

//AGREGAR IMAGENES
router.post('/subir-imagen/:id', multiPartMiddleware,ProductController.uploatImagen);

//CARGAR IMAGENES

router.get('/get-imagen/:imagen', ProductController.getImagen);


module.exports=router;  // exportar un objeto route desde un modulo de node.js paa utilizarlo en otro archivos 

