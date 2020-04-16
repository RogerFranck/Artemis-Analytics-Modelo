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
  estado: {
    type: Number,
    default: 1
  },
  fechaCita: Date,
  completadoCita:{
    type: Boolean,
    default: false
  },
  fechaExani: Date,
  completadoExani:{
    type: Boolean,
    default: false
  },
  genearadaFicha:{
    type: Boolean,
    default: false
  },
  pagadaFicha: {
    type: Boolean,
    default: false
  }
})

module.exports = model('prospectoModel', prospectoSchema)