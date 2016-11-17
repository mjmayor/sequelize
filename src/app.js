var properties = require('node-properties')('node-module-sequelize'),
  express = require('express'),
  path = require('path'),
  swig = require('swig');

// MIDDLEWARE
module.exports = express()
  .engine('html', swig.renderFile)
  .set('view engine', 'html')
  .set('views', path.join(__dirname, 'views'))
  .set('view cache', properties.view_cache)

// ROUTING AL MÓDULO EN SI
.use('/modulos/sequelize/alumnos', require('./routes/AlumnoController'))
  .use('/modulos/sequelize/profesores', require('./routes/ProfesorController'))
  .use('/modulos/sequelize/asignaturas', require('./routes/AsignaturaController'));