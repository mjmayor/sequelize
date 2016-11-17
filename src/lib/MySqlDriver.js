var properties = require('node-properties')('node-module-sequelize'),
	Sequelize = require('sequelize'),
	connection;

module.exports = {

	getConnection: function() {
		if (!connection) {
			connection = new Sequelize(properties.datasource.schema, properties.datasource.username, properties.datasource.password, {
				host: properties.datasource.host,
				port: properties.datasource.port,
				dialect: 'mysql',

				// Con la variable logging podemos definir si queremos o no log de las queries o tambien nos
				// podemos definir nuestro propio logger. Por defecto el logging se encuentra activo y la
				// salida por defecto es la consola
				// logging: false,
				// logging: function (message) {...}

				pool: {
					max: properties.datasource.pool,
					min: properties.datasource.min,
					idle: properties.datasource.idle
				}
			});
		}
		return connection;
	}
};