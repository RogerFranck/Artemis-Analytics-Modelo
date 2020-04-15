const {Router} = require('express')
const router = Router();

const {getProspectos, getProspecto, updateProspecto, deleteProspecto} = require('../controllers/prospectos.controllers')

router.route('/')
  .get(getProspectos)

  router.route('/:id')
    .get(getProspecto)
    .get(updateProspecto)
    .get(deleteProspecto)
module.exports = router;