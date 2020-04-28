const {Router} = require('express')
const router = Router();

const {getProspectos, postProspecto, getProspecto, updateProspecto, deleteProspecto,
  getinscritos,
  getcontactados,
  getSemiInscritos,
  getInteresados,
  getProspectosByName,
  getProspectoPorCarrera,
} = require('../controllers/prospectos.controllers')

 
router.route('/')
  .get(getProspectos)
  .post(postProspecto)
router.route('/Interesados/:carrera')
  .get(getInteresados)
router.route('/Contactados/:carrera')
  .get(getcontactados)
router.route('/SemiInscritos/:carrera')
  .get(getSemiInscritos)
router.route('/Inscritos/:carrera')
  .get(getinscritos)
router.route('/:nombre')
  .get(getProspectosByName)
router.route('/:id')
    .get(getProspecto)
    .put(updateProspecto)
    .delete(deleteProspecto)
module.exports = router;