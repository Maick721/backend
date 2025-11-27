'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
    marca: String,
    modelo: String,
    ram: String,
    rom: String, 
    precio: Number,
    imagen: String
});
module.exports= mongoose.model('Producto', ProductoSchema);
