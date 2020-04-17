const prospectosCtrl = {};

const prospectoModelo = require('../models/modelProspecto')

prospectosCtrl.getInteresados = async (req,res) => {
  const docs = await prospectoModelo.find({ 'estado': 1 })
  res.json(docs)
}
prospectosCtrl.getcontactados = async (req,res) => {
  const docs = await prospectoModelo.find({ 'estado': 2 })
  res.json(docs)
}
prospectosCtrl.getSemiInscritos = async (req,res) => {
  const docs = await prospectoModelo.find({ 'estado': 3 })
  res.json(docs)
}
prospectosCtrl.getinscritos = async (req,res) => {
  const docs = await prospectoModelo.find({ 'estado': 4 })
  res.json(docs)
}

prospectosCtrl.getProspectos = async (req,res) => {
  const prospectos = await prospectoModelo.find()
  res.json(prospectos)
}

prospectosCtrl.postProspecto = async (req, res) =>{
  const {nombre, carrera, correo, numero, estado, fechaCita, completadoCita, fechaExani, completadoExani, fichaGenerada, fichaPagada} = req.body
  const nuevoProspecto = new prospectoModelo ({
    nombre: nombre,
    carrera: carrera,
    correo: correo,
    numero: numero,
    estado: estado,
    fechaCita: fechaCita,
    completadoCita,
    fechaExani: fechaExani,
    completadoExani,
    fichaGenerada,
    fichaPagada,
  });
  await nuevoProspecto.save();
  res.json({message: 'Usuario guardado'})
}

prospectosCtrl.getProspecto = async (req,res) => {
  const prospecto = await prospectoModelo.findById(req.params.id)
  res.json(prospecto)
}

prospectosCtrl.updateProspecto = async (req, res) => {
  await prospectoModelo.findOneAndUpdate({_id: req.params.id}, req.body)
  res.json({message: "Prospecto actualizado"})
}

prospectosCtrl.deleteProspecto = async (req, res) => {
  await prospectoModelo.findOneAndDelete({_id: req.params.id})
  res.json({message: 'Prospecto borrado'})
}

module.exports = prospectosCtrl;