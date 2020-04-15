const {Schema, model} = require('mongoose');

const prospectoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  carrera: {
    type: String,
    required: true,
  }, 
  correo: String, 
  numero: Number,
  estado: Number,
  cita: {
    fecha: Date,
    completado: Boolean
  },
  exani:{
    fecha: Date,
    completado: Boolean,
  },
  ficha:{
    genearada: Boolean,
    pagada: Boolean,
  }
})

module.exports = model('prospectoModel', prospectoSchema)