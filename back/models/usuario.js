const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let proyectoSchema = new Schema({
  nombreUsuario: String,
  clave: String,
  tipo: Number
});

module.exports = mongoose.model('Usuario', proyectoSchema);