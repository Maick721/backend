const mongoose = require('mongoose');

const compraSchema = new mongoose.Schema({
  fecha: String,
  productos: [String]
}, { _id: false });

const clienteSchema = new mongoose.Schema({
  id: Number,
  nombre: String,
  correo: String,
  telefono: String,
  direccion: String,
  historial_compras: [compraSchema]
}, { collection: 'clientes' });

module.exports = mongoose.model('Cliente', clienteSchema);
