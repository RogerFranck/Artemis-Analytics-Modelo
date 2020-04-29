const usuariosCtrl = {};

const usuarioModel = require('../models/modelUsuario')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

usuariosCtrl.getUsers = async (req, res) => {
  const usuarios = await usuarioModel.find()
  res.json(usuarios)
};

//pendiente CreateUser
usuariosCtrl.createUser = async (req, res) => {
  const { tipo, nombre, carrera, correo, numero, matricula, usuario, password } = req.body
  const nuevoUsuario = new usuarioModel({
    tipo: tipo,
    nombre: nombre,
    carrera: carrera,
    correo: correo,
    numero: numero,
    matricula: matricula,
    usuario: usuario,
    password: password,
  });
  nuevoUsuario.password = await nuevoUsuario.encryptPassword(password);
  await nuevoUsuario.save();
  res.json({ message: 'Usuario guardado' })
}


usuariosCtrl.getUser = async (req, res) => {
  //req.params.id //recibir el id 
  const usuario = await usuarioModel.findById(req.params.id)
  res.json(usuario)
};

usuariosCtrl.updateUser = async (req, res) => {
  const { tipo, nombre, carrera, correo, numero, usuario, password } = req.body
  const nuevoUsuario = {
    tipo: tipo,
    nombre: nombre,
    carrera: carrera,
    correo: correo,
    numero: numero,
    usuario: usuario,
    password: password,
  }
  const salt = await bcrypt.genSalt(10);
  nuevoUsuario.password = await bcrypt.hash(password, salt);
  await usuarioModel.findOneAndUpdate({ _id: req.params.id }, nuevoUsuario)
  res.json({ message: "Usuario Actualizado" })
};


usuariosCtrl.deleteUser = async (req, res) => {
  await usuarioModel.findOneAndDelete({ _id: req.params.id })
  res.json({ message: 'Usuario borrado' })
};


module.exports = usuariosCtrl;