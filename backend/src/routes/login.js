const {Router} = require('express')
const router = Router();

const User = require('../models/modelUsuario')
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  const user = await User.findOne({usuario: req.body.usuario})
  if(!user) {
      return res.status(404).send("The user doesn't exists")
  }
  const validPassword = await user.comparePassword(req.body.password);
  if (!validPassword) {
      return res.status(401).send({auth: false, token: null});
  }
  const token = jwt.sign({id: user._id}, process.env.SECRET, {
      expiresIn: 60 * 60 * 24
  });
  res.status(200).json({auth: true, token});
});

module.exports = router;