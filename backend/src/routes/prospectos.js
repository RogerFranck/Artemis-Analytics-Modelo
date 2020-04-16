const {Router} = require('express')
const router = Router();

const {getProspectos, postProspecto, getProspecto, updateProspecto, deleteProspecto} = require('../controllers/prospectos.controllers')

router.route('/')
  .get(getProspectos)
  .post(postProspecto)

  router.route('/:id')
    .get(getProspecto)
    .put(updateProspecto)
    .delete(deleteProspecto)
module.exports = router;