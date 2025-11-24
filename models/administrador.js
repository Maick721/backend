const mongoose = require('mongoose');

const administradorSchema = new mongoose.Schema({
  id: Number,
  nombre: String,
  correo: String,
  rol: String,
  permisos: [String]
}, { collection: 'administradores' });

module.exports = mongoose.model('Administrador', administradorSchema);
