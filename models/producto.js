const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  id: Number,
  nombre: String,
  descripcion: String,
  precio: Number,
  categoria: String,
  stock: Number,
  marca: String,
  codigo_barras: String,
  fecha_ingreso: String,
  oferta: Boolean
}, { collection: 'productos' }); 
module.exports = mongoose.model('Producto', productoSchema);
