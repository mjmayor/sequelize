var properties = require('node-properties')('node-module-sequelize'),
	common = require('node-common')('node-module-sequelize'),
	mySqlDriver = require('../lib/MySqlDriver'),
	connection = mySqlDriver.getConnection(),
	repository = require('../repository/AlumnoRepository'),
	asignaturaRepository = require('../repository/AsignaturaRepository');

module.exports.save = function(alumno, callback) {
	// Mas info: 
	// - http://docs.sequelizejs.com/en/latest/docs/instances/
	// - http://docs.sequelizejs.com/en/latest/docs/associations/#associating-objects
	// - http://docs.sequelizejs.com/en/latest/docs/transactions/
	connection.transaction(function(t) {
		return repository.save(alumno, t).then(function(data) {
			return data.setAsignaturas(alumno.asignaturas, {
				transaction: t
			});
		});
	}).then(function(objetoTablaIntermedia) {
		console.log(JSON.stringify(objetoTablaIntermedia));
		return callback(null, objetoTablaIntermedia);
	}).catch(function(error) {
		return callback(error);
	});
};

module.exports.getAll = function(order, callback) {
	repository.getAll(order, callback);
};

module.exports.getById = function(id, callback) {
	repository.getById(id, callback);
};

module.exports.getAllSql = function(callback) {
	repository.getSql('select * from alumno', {}, callback);
};

module.exports.getByIdSql = function(id, callback) {
	repository.getSql('select * from alumno where id=:id', {
		id: id
	}, callback);
};