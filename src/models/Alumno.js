var properties = require('node-properties')('node-module-sequelize'),
    common = require('node-common')('node-module-sequelize'),
    mySqlDriver = require('../lib/MySqlDriver'),
    connection = mySqlDriver.getConnection(),
    Sequelize = require('sequelize'),
    Asignatura = require('./Asignatura').getModel(),
    Alumno;


module.exports.getModel = function() {
    Alumno = Alumno || connection.define('alumno', {
        // Si la PK de nuestra tabla se llama id y es un campo numerico no es necesario
        // mapearlo, sequelize lo hace automaticamente
        // No obstante, hay que definirla explicitamente par que sea autoincrementable
        // Mas info: http://docs.sequelizejs.com/en/latest/docs/models-definition/
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dni: {
            type: Sequelize.STRING,
            field: 'dni', // No es necesario en caso de que el campo del modelo se llame igual
            // que el de la BBDD
            validate: {
                notEmpty: {
                    msg: 'El DNI no puede ser vacío'
                }
            }

        },
        nombre: {
            type: Sequelize.STRING,
            field: 'nombre',
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'El campo nombre no puede ser vacío'
                }
            }
        },
        apellidos: {
            type: Sequelize.STRING,
            field: 'apellidos',
            validate: {
                notEmpty: {
                    msg: 'El campo apellidos no puede ser vacío'
                }
            }
        },
        fechaNacimiento: {
            type: Sequelize.DATE,
            field: 'fecha_nacimiento',
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'La fecha de nacimiento no puede ser vacía'
                }
            }
        },
        email: {
            type: Sequelize.STRING,
            field: 'email',
            notEmpty: true,
            validate: {
                isCorrect: function(value) {
                    if (value.length > 0 && !/[^\s@]+@[^\s@]+\.[^\s@]+/.test(value)) {
                        throw new Error('El formato del email no es correcto');
                    }
                    // Dentro de la validacion estamos en el contexto del modelo
                    // Podemos acceder a los demas campos si fuera necesario con this.otroCampo
                }
            }
        }
    }, {
        // Por defecto sequelize transformara automaticamente los nombres de modelo
        // (primer parametro del define) a plural. Con freezeTableName desactivamos
        // esta caracteristica
        freezeTableName: true,

        // Si no se añade lo siguiente, sequelize añade por defecto a la query los
        // atributos createdAt y updatedAt
        timestamps: false

        // Mas info: http://docs.sequelizejs.com/en/latest/docs/models-definition/
    });

    // Many to many
    // Mas info: http://docs.sequelizejs.com/en/latest/docs/associations/#belongs-to-many-associations
    Alumno.belongsToMany(Asignatura, {
        as: 'asignaturas', // Alias
        through: 'matricula', // Tabla intermedia
        foreignKey: 'id_alumno', // Foreign key en la tabla relacionada. No es obligatorio pero si no se usa,
        // Sequelize pondra un nombre por defecto concatenando el nombre de la tabla 
        // relacionada a la PK de esa misma tabla --> profesorId

        //Mas info: http://docs.sequelizejs.com/en/latest/docs/associations/
        timestamps: false
    });
    Asignatura.belongsToMany(Alumno, {
        as: 'alumnos',
        through: 'matricula',
        foreignKey: 'id_asignatura',
        timestamps: false
    });

    // Con Model.sync() podemos sincronizar nuestro modelo con la BBDD (validar, crear las tablas,...)
    // Mas info: http://docs.sequelizejs.com/en/latest/docs/models-definition/#database-synchronization
    return Alumno;
};