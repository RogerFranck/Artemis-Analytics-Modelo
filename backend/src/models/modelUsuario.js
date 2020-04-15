const {Schema, model} = require('mongoose');

const usuarioSchema = new Schema({
  tipo: {
    type: String,
    required: true,
  },
  nombre : {
    type: String,
    required: true,
  },
  carrera: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true,
  },
  numero: Number,
  matricula: Number,
  usuario: {
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  }
})


module.exports = model('usuarioModel', usuarioSchema)