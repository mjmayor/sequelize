var properties = require('node-properties')('node-module-sequelize'),
	common = require('node-common')('node-module-sequelize'),
	mySqlDriver = require('../lib/MySqlDriver'),
	connection = mySqlDriver.getConnection(),
	Asignatura = require('../models/Asignatura.js').getModel(),
	Alumno = require('../models/Alumno.js').getModel(),
	Profesor = require('../models/Profesor.js').getModel();


module.exports.getAll = function(order, callback) {
	Asignatura.findAll({
		include: [{
			model: Profesor,
			as: 'profesor'
		}, {
			model: Alumno,
			as: 'alumnos'
		}],
		order: order
	}).then(function(asignaturas) {
		callback(null, asignaturas);
	}).catch(function(error) {
		callback(error);
	});
};

module.exports.getByIds = function(ids, callback) {
	ids = ids || [];
	Asignatura.findAll({
		include: [{
			model: Profesor,
			as: 'profesor'
		}, {
			model: Alumno,
			as: 'alumnos'
		}],
		where: {
			id: {
				$in: ids
			}
		}
	}).then(function(asignaturas) {
		callback(null, asignaturas);
	}).catch(function(error) {
		callback(error);
	});
};

module.exports.getById = function(id, callback) {
	Asignatura.findById(id, {
		include: [{
			model: Profesor,
			as: 'profesor'
		}, {
			model: Alumno,
			as: 'alumnos'
		}]
	}).then(function(asignatura) {
		callback(null, asignatura);
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