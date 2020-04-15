const express = require('express');
const cors = require('cors');
const app = express();

//settings
app.set('port', process.env.PORT || 4000)

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.get('/usuarios', require('./routes/usuarios'))
app.get('/prospectos', require('./routes/prospectos'))
module.exports = app;