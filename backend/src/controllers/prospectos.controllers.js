const prospectosCtrl = {};

const prospectoModelo = require('../models/modelProspecto')

prospectosCtrl.getProspectos = async (req,res) => {
  const prospectos = await prospectoModelo.find()
  res.json(prospectos)
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