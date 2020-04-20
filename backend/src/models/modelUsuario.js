const {Schema, model} = require('mongoose');

const usuarioSchema = new Schema({
  tipo: {
    type: String,
    required: true,
    default:1,
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
  numero:{
    type: Number,
    required: false
  },
  matricula: {
    type: Number,
    required: false
  },
  usuario: {
    type: String,
    required: true,
   
  },
  password:{
    type: String,
    required: true
  }
})


module.exports = model('usuarioModel', usuarioSchema)