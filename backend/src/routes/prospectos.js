const {Router} = require('express')
const router = Router();

const {getProspectos, postProspecto, getProspecto, updateProspecto, deleteProspecto,
  getinscritos,
  getcontactados,
  getSemiInscritos,
  getInteresados,
  getProspectosByName,
} = require('../controllers/prospectos.controllers')

 
router.route('/')
  .get(getProspectos)
  .post(postProspecto)
router.route('/Interesados')
  .get(getInteresados)
router.route('/Contactados')
  .get(getcontactados)
router.route('/SemiInscritos')
  .get(getSemiInscritos)
router.route('/Inscritos')
  .get(getinscritos)
router.route('/:nombre')
  .get(getProspectosByName)
router.route('/:id')
    .get(getProspecto)
    .put(updateProspecto)
    .delete(deleteProspecto)
module.exports = router;