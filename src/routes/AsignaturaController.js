var properties = require('node-properties')('node-module-sequelize'),
    express = require('express'),
    router = express.Router();

var service = require('../services/AsignaturaService.js'),
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
            template: 'asignaturas/listSql'
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
            template: 'asignaturas/list'
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
            template: 'asignaturas/listSql'
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
            template: 'asignaturas/list'
        });
    });
});


function output(args) {
    if (args.error) {
        args.res.render('error', {
            error: args.error
        });
    } else {
        args.data = args.data || {};
        args.data.title = args.title;
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