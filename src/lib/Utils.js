module.exports.getOrder = function(query) {
	var splittedOrder, order = [];
	if (query && query.order) {
		splittedOrder = query.order.split(',');
		order = splittedOrder[0] + ' ' + splittedOrder[1];
	}
	return order;
};

module.exports.getAlumno = function(query) {
	return {
		dni: query.dni,
		nombre: query.nombre,
		apellidos: query.apellidos,
		fechaNacimiento: query.fechaNacimiento,
		email: query.email,
		asignaturas: query.asignaturas
	};
};