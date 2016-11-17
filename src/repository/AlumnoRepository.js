var properties = require('node-properties')('node-module-sequelize'),
    common = require('node-common')('node-module-sequelize'),
    mySqlDriver = require('../lib/MySqlDriver'),
    connection = mySqlDriver.getConnection(),
    Alumno = require('../models/Alumno.js').getModel(),
    Asignatura = require('../models/Asignatura.js').getModel();


module.exports.save = function(alumno, transaction) {
    return Alumno.create(alumno, {
        transaction: transaction
    });
};

module.exports.getAll = function(order, callback) {
    // Para recuperar la jerarquia de objetos hay que poner include
    // Importante: si en la definicion del model se añadio un alias, 
    // hay que poner aqui ese mismo alias OBLIGATORIAMENTE

    // findAll por defecto devuelve todos los atributos de la tabla. Si queremos devolver
    // solo unos cuantos atributos: findAll({attributes: ['foo', 'bar']})
    // Mas info: http://docs.sequelizejs.com/en/latest/docs/querying/#attributes
    Alumno.findAll({
        include: [{
            model: Asignatura,
            as: 'asignaturas'
        }],
        order: order // Mas info: http://docs.sequelizejs.com/en/latest/docs/querying/#ordering
    }).then(function(alumnos) {
        callback(null, alumnos);
    }).catch(function(error) {
        callback(error);
    });
};

module.exports.getById = function(id, callback) {
    // Tambien se podria poner:
    // Alumno.findAll({
    //  include: [{
    //      model: Asignatura,
    //      as: 'asignaturas'
    //  }],
    //  where: {
    //      id: id
    //  }
    // })
    Alumno.findById(id, {
        include: [{
            model: Asignatura,
            as: 'asignaturas'
        }]
    }).then(function(alumno) {
        callback(null, alumno);
    }).catch(function(error) {
        callback(error);
    });
};

module.exports.getSql = function(query, params, callback) {
    //  Paso de parametros por orden
    //  'SELECT * FROM projects WHERE status = ?'
    //  replacements: ['active']

    //  Paso de parametros por orden
    //  'SELECT * FROM projects WHERE status = :status '
    //  replacements: {
    //      status: 'active'
    //  }
    var replacements = {
        replacements: params
    };
    connection.query(query, replacements).then(function(rows) {
        callback(null, rows[0]);
    }).catch(function(error) {
        callback(error);
    });
};