var properties = require('node-properties')('node-module-sequelize'),
	common = require('node-common')('node-module-sequelize'),
	mySqlDriver = require('../lib/MySqlDriver'),
	connection = mySqlDriver.getConnection(),
	Sequelize = require('sequelize'),
	Asignatura;


module.exports.getModel = function() {
	Asignatura = Asignatura || connection.define('asignatura', {
		nombre: {
			type: Sequelize.STRING,
			field: 'nombre'
		},
		curso: {
			type: Sequelize.INTEGER,
			field: 'curso'
		},
		creditos: {
			type: Sequelize.DECIMAL,
			field: 'creditos'
		}
	}, {
		freezeTableName: true,
		timestamps: false,
		underscored: true
	});

	return Asignatura;
};