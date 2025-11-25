const mongoose = require("mongoose");

const ClienteSchema = new mongoose.Schema({
    nombre: String,
    email: { type: String, unique: true },
    foto: String,
    googleId: String
});

module.exports = mongoose.model("Cliente", ClienteSchema);
