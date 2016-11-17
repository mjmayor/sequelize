var properties = require('node-properties')('node-module-sequelize'),
	common = require('node-common')('node-module-sequelize'),
	mySqlDriver = require('../lib/MySqlDriver'),
	connection = mySqlDriver.getConnection(),
	Profesor = require('../models/Profesor.js').getModel(),
	Asignatura = require('../models/Asignatura.js').getModel();


module.exports.getAll = function(order, callback) {

	Profesor.findAll({
		include: [{
			model: Asignatura,
			as: 'asignaturas'
		}],
		order: order
	}).then(function(profesores) {
		callback(null, profesores);
	}).catch(function(error) {
		callback(error);
	});
};

module.exports.getById = function(id, callback) {
	Profesor.findById(id, {
		include: [{
			model: Asignatura,
			as: 'asignaturas'
		}]
	}).then(function(profesor) {
		callback(null, profesor);
	}).catch(function(error) {
		callback(error);
	});
};

module.exports.getSql = function(query, params, callback) {
	var replacements = {
		replacements: params
	};
	connection.query(query, replacements).then(function(rows) {
		callback(null, rows[0]);
	}).catch(function(error) {
		callback(error);
	});
};