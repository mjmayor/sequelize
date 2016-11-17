module.exports = function(grunt) {

  'use strict';

      // CONFIGURACIÓN Y TAREAS GLOBALES
      // OBTENEMOS CONFIGURACIONES DE CORE Y LAS EXTENDEMOS CON LA INFORMACIÓN DE ESTE MÓDULO
  var configs = require('grunt-rtve-manager')(grunt);
  configs.pkg = grunt.file.readJSON('package.json'); // necesario para grunt


      // CONFIGURACIONES LOCALES PARA GRUNT
  configs.packgrInstall.basico.options.finalName = 'init_sequelize'; // empaquetado de js cliente
  configs.jshint.dev.options.globals.requirejs = true; // Ignora variables globales no declaradas en JSHinT
  
  configs.karma.unit.options.browsers = ['PhantomJS']; // Configura Test browsers
    //Chrome, PhantomJS, Firefox, Opera, IE, Safari


      // OTROS EJEMPLOS DE CONFIGURACIONES
// configs.jshint.dev.options.globals.history = true; // Ignorar variables globales no declaradas en JSHinT
// configs.htmlmin.deploy.files = ''; // Desactivar minificado de HTML (solo si da errores)
// console.log(require('util').inspect(configs,false, null)); process.exit(1); // Revisando configuración


      // LANZAMOS GRUNT
  grunt.initConfig(configs);
};