'use strict';

var Producto = require('../models/producto');
var Administrador = require('../models/administrador');
var Cliente = require('../models/cliente');

var path = require('path');
var fs = require('fs');

var controller = {

    home: function (req, res) {
        return res.status(200).send("<h1> Backend Tienda Aki     </h1>");
    },

    // Para productos

    saveProducto: function (req, res) {
        var producto = new Producto();
        var params = req.body;

        producto.id = params.id;
        producto.nombre = params.nombre;
        producto.descripcion = params.descripcion;
        producto.precio = params.precio;
        producto.categoria = params.categoria;
        producto.stock = params.stock;
        producto.marca = params.marca;
        producto.codigo_barras = params.codigo_barras;
        producto.fecha_ingreso = params.fecha_ingreso;
        producto.oferta = params.oferta;
        producto.imagen = null;

        producto.save()
            .then(productoStored => {
                if (!productoStored)
                    return res.status(400).send({ message: 'No se ha guardado el producto' });

                return res.status(200).send({ producto: productoStored });
            })
            .catch(err => {
                return res.status(500).send({ message: 'Error al guardar', error: err });
            });
    },

    getProductos: function (req, res) {
        Producto.find().sort({ id: 1 }).exec()
            .then(productos => {
                if (!productos || productos.length === 0)
                    return res.status(404).send({ message: 'No hay productos' });

                return res.status(200).send({ productos });
            })
            .catch(err => {
                return res.status(500).send({ message: 'Error al recuperar datos', error: err });
            });
    },

    getProducto: function (req, res) {
        var productoId = req.params.id;

        Producto.findOne({ id: productoId }).exec()
            .then(producto => {
                if (!producto)
                    return res.status(404).send({ message: 'El producto no existe' });

                return res.status(200).send({ producto });
            })
            .catch(err => {
                return res.status(500).send({ message: 'Error al recuperar los datos', error: err });
            });
    },

    deleteProducto: function (req, res) {
        var productoId = req.params.id;

        Producto.findOneAndDelete({ id: productoId })
            .then(productoRemoved => {
                if (!productoRemoved)
                    return res.status(404).send({ message: 'No existe el producto' });

                return res.status(200).send({
                    producto: productoRemoved,
                    message: 'Producto eliminado correctamente'
                });
            })
            .catch(err => {
                return res.status(500).send({ message: 'Error al eliminar', error: err });
            });
    },

    updateProducto: function (req, res) {
        var productoId = req.params.id;
        var update = req.body;

        Producto.findOneAndUpdate({ id: productoId }, update, { new: true })
            .then(productoUpdate => {
                if (!productoUpdate)
                    return res.status(404).send({ message: 'No existe el producto' });

                return res.status(200).send({ producto: productoUpdate });
            })
            .catch(err => {
                return res.status(500).send({ message: 'Error al actualizar', error: err });
            });
    },

    // Para imagenes

    uploadImagen: function (req, res) {
        var productoId = req.params.id;

        if (req.files) {
            var filePath = req.files.imagen.path;
            var file_split = filePath.split('\\');
            var fileName = file_split[file_split.length - 1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[extSplit.length - 1];

            if (['png', 'jpg', 'jpeg', 'gif'].includes(fileExt)) {

                Producto.findOneAndUpdate(
                    { id: productoId },
                    { imagen: fileName },
                    { new: true }
                )
                    .then(productoUpdate => {
                        if (!productoUpdate) {
                            fs.unlink(filePath, () => { });
                            return res.status(404).send({ message: 'Producto no existe' });
                        }
                        return res.status(200).send({ producto: productoUpdate });
                    })
                    .catch(err => {
                        fs.unlink(filePath, () => { });
                        return res.status(500).send({ message: 'Error al subir la imagen', error: err });
                    });
            } else {
                fs.unlink(filePath, () => { });
                return res.status(400).send({ message: 'Extensión no válida' });
            }
        }
    },

    getImagen: function (req, res) {
        var file = req.params.imagen;
        var path_file = './uploads/' + file;

        fs.exists(path_file, exists => {
            if (exists) return res.sendFile(path.resolve(path_file));
            else return res.status(404).send({ message: 'No existe la imagen' });
        });
    },

    // Administradores

    getAdministradores: function (req, res) {
        Administrador.find().exec()
            .then(admins => {
                if (!admins || admins.length === 0)
                return res.status(404).send({
                 message: 'No hay administradores' });

            return res.status(200).send({ administradores: admins });
            })
            .catch(err => {
            return res.status(500).send({ 
            message: 'Error al recuperar administradores', error: err });
            });
        },

    // Apartado de clientes

    getClientes: function (req, res) {
        Cliente.find().exec()
            .then(clientes => {
                if 
                (!clientes || clientes.length === 0)
                    return res.status(404).send({ 
                message: 'No hay clientes' });

                return res.status(200).send({ clientes });
            })
            .catch(err => {
                return res.status(500).send({ 
                message: 'Error al recuperar clientes', error: err });
            });
         }
        };

module.exports = controller;
