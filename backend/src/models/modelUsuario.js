const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

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

usuarioSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

usuarioSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = model('usuarioModel', usuarioSchema)