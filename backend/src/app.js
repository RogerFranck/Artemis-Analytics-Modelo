const express = require('express');
const cors = require('cors');
const app = express();

//settings
app.set('port', process.env.PORT || 4000)

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/usuarios', require('./routes/usuarios'))
app.use('/prospectos', require('./routes/prospectos'))

module.exports = app;