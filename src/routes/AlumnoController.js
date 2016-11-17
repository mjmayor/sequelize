var properties = require('node-properties')('node-module-sequelize'),
    express = require('express'),
    router = express.Router();

var service = require('../services/AlumnoService.js'),
    asignaturaService = require('../services/AsignaturaService.js'),
    utils = require('../lib/Utils.js');


var urlPattern = /sql\/(\d+)/;
router.get(urlPattern, function(req, res) {
    var regExp = new RegExp(urlPattern),
        coincidences = regExp.exec(req.url),
        id = parseInt(coincidences[1]);

    service.getByIdSql(id, function(error, data) {
        output({
            req: req,
            res: res,
            error: error,
            data: data,
            template: 'alumnos/listSql'
        });
    });
});

urlPattern = /(\d+)/;
router.get(urlPattern, function(req, res) {
    var regExp = new RegExp(urlPattern),
        coincidences = regExp.exec(req.url),
        id = parseInt(coincidences[1]);

    service.getById(id, function(error, data) {
        output({
            req: req,
            res: res,
            error: error,
            data: [data],
            template: 'alumnos/list'
        });
    });
});

router.get(/sql/, function(req, res) {
    service.getAllSql(function(error, data) {
        output({
            req: req,
            res: res,
            error: error,
            data: data,
            template: 'alumnos/listSql'
        });
    });
});

router.get('/', function(req, res) {
    var order = utils.getOrder(req.query);
    service.getAll(order, function(error, data) {
        output({
            req: req,
            res: res,
            error: error,
            data: data,
            template: 'alumnos/list'
        });
    });
});

router.get(/form/, function(req, res) {
    var asignaturas = asignaturaService.getAll([], function(error, data) {
        output({
            req: req,
            res: res,
            error: error,
            data: {
                asignaturas: data
            },
            template: 'alumnos/form'
        });
    });
});

router.get(/add/, function(req, res) {
    var alumno = utils.getAlumno(req.query);
    service.save(alumno, function(error, data) {
        output({
            req: req,
            res: res,
            error: error,
            data: {},
            template: 'alumnos/ok'
        });
    });
});

function output(args) {
    if (args.error) {
        args.res.render('error', {
            error: args.error
        });
    } else {

        args.res.format({
            'text/html': function() {
                args.res.render(args.template, {
                    res: args.data
                });
            },

            'application/json': function() {
                args.res.send(args.data);
            },

            'default': function() {
                args.res.status(406).send('Not Acceptable');
            }
        });
    }
}

module.exports = router;