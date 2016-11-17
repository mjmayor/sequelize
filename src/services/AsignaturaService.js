var properties = require('node-properties')('node-module-sequelize'),
	common = require('node-common')('node-module-sequelize'),
	repository = require('../repository/AsignaturaRepository');


module.exports.getAll = function(order, callback) {
	repository.getAll(order, callback);
};

module.exports.getById = function(id, callback) {
	repository.getById(id, callback);
};

module.exports.getAllSql = function(callback) {
	repository.getSql('select * from asignatura', {}, callback);
};

module.exports.getByIdSql = function(id, callback) {
	repository.getSql('select * from asignatura where id=:id', {
		id: id
	}, callback);
};