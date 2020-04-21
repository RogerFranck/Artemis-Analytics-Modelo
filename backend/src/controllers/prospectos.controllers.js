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
prospectosCtrl.getProspectosByName = async (req,res) => {
  let prospectos1 = await prospectoModelo.find({"nombre": `${req.params.nombre}`}).collation({locale:"es", strength:1, alternate:"shifted"});
  let prospectos2 = await prospectoModelo.find({"nombre": new RegExp(`${req.params.nombre}`, 'gi')});
  let prospectos3 = await prospectoModelo.find({"nombre": new RegExp(`/^${req.params.nombre}`, 'gi')});
  prospectos1 = prospectos2.concat(prospectos3);
  prospectos1 = prospectos1.concat(prospectos2);
  prospectos1 = prospectos1.filter(function(value,index,self){
    return self.indexOf(value) === index;
  });
  res.json(prospectos1)
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
  //Pase automatico de contactado a semi inscrito
  if(req.body.estado==2 && req.body.fichaGenerada==true && req.body.completadoExani==true){
    req.body["estado"]=3;
  }
  //Pase automatico de semi inscrito a inscrito
  if(req.body.estado==3 && req.body.fichaPagada==true){
    req.body["estado"]=4;
  }
  //Pase automatico de inscrito a semi inscrito --por si existe algun error--
  if(req.body.estado==4 && req.body.fichaPagada==false){
    req.body["estado"]=3;
  }
  await prospectoModelo.findOneAndUpdate({_id: req.params.id}, req.body)
  res.json({message: "Prospecto actualizado"})
}

prospectosCtrl.deleteProspecto = async (req, res) => {
  await prospectoModelo.findOneAndDelete({_id: req.params.id})
  res.json({message: 'Prospecto borrado'})
}

module.exports = prospectosCtrl;