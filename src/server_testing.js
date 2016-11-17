var properties = require('node-properties')('node-web', process.env.NODE_ENV),
    express = require('express'),
    path = require('path'),
    common = require('node-common')('node-web'),
    qs = require('querystring'),
    swig = require('swig'),
    ssi_r = require('ssi_resolver')('http://localhost:' + properties.nodePort, /^\/test\/((?!\/modulos).)*$/);

swig.setDefaults({
    locals: {
        init_js: 'init_sequelize',
        body_class: 'p_final',
        cssUrl: properties.cssUrl
    },
    cache: properties.swig_view_cache
});

// Configuración para simular entorno de producción  (grunt pro)
var isDevMode = process.argv.slice(2)[0] === 'nobuild',
    baseFolder = isDevMode ? '.' : '../dist',
    buildTarget = isDevMode ? '/.tmp/merge' : '.';

// Configuraciones iniciales
var app = express();
var sequelize = require(path.join(__dirname, baseFolder, 'app.js'));

// MIDDLEWARE Y ROUTING
app
    .engine('html', swig.renderFile)
    .set('view engine', 'html')
    .set('views', path.join(__dirname, 'views'))
    .set('view cache', properties.view_cache)
    .use(express.static(path.join(__dirname, baseFolder, buildTarget))) // Assets

.use(setResponse) // formatea respuestas a html o json según  lo que se envía
    .use(sequelize)
    .use(ssi_r) // Procesa output y resuleve los Includes virtuales
    .use('/template/test', solveQueries)

.use(errorStatus, errorRequest); // redirige errores


var server = app.listen( /*properties.nodePort*/ 3070, serve); // Lanza el servidor

module.exports = app;

// CALLBACKS
function solveQueries(req, res, next) {
    var querystring = qs.stringify(req.query);
    var delimitator = '?';
    var redirect = delimitator + querystring;
    res.render('../test/views/layoutTesting', {
        querystring: redirect,
        content: req.url
    });
}

function setResponse(req, res, next) {
    var format = /\.json/;
    if (req.url.match(format)) {
        req.headers.accept = 'application/json';
        req.url = req.url.replace(format, '');
    }
    next();
}

function errorStatus(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function errorRequest(err, req, res, next) { // Error handler
    res.status(err.status || 500);
    res.send(err.message || 'Ha ocurrido un error.');
}

function serve() {
    console.log('Server testing listening on: http://localhost:' + server.address().port + '/modulos/sequelize');
}