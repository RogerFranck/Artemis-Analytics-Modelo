const express = require('express');
const cors = require('cors');
const app = express();

//settings
app.set('port', process.env.PORT || 4000)

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(express.json());

//routes
app.use('/usuarios', require('./routes/usuarios'))
app.use('/prospectos', require('./routes/prospectos'))
app.use('/login', require('./routes/login'))

module.exports = app;