var properties = require('node-properties')('node-module-sequelize'),
	common = require('node-common')('node-module-sequelize'),
	mySqlDriver = require('../lib/MySqlDriver'),
	connection = mySqlDriver.getConnection(),
	Sequelize = require('sequelize'),
	Asignatura = require('./Asignatura').getModel(),
	Profesor;


module.exports.getModel = function() {
	Profesor = Profesor || connection.define('profesor', {
		nombre: {
			type: Sequelize.STRING,
			field: 'nombre'
		},
		apellidos: {
			type: Sequelize.STRING,
			field: 'apellidos'
		}
	}, {
		freezeTableName: true,
		timestamps: false
	});

	Profesor.hasMany(Asignatura, {
		as: 'asignaturas',
		foreignKey: 'profesor_id'
	});

	Asignatura.belongsTo(Profesor, {
		as: 'profesor',
		foreignKey: 'profesor_id' // Añade automaticamente el atributo profesor_id al model de Asignatura
	});

	return Profesor;
};