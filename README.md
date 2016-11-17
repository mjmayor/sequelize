## [Grunt]  
grunt install  - Installs the dependencies of the module  
grunt dev      - For development stuff [grunt install + dev]  
grunt deploy   - [copy 'src/assets']  
grunt testNode - Run the tests  
grunt compile  - Compile the templates under views/templates  
grunt pro      - Runs the module simulating production assets (point to /dist/)

## Properties
Copy node-module-sequelize-env.json to /conf/aplicaciones/node-web/node-module-sequelize-env.json

## Database creation
Execute script tablas.sql

## URL examples
/modulos/sequelize/[profesores|alumnos|asignaturas]/: Get all
/modulos/sequelize/[profesores|alumnos|asignaturas]/sql: Get all using a SQL native query
/modulos/sequelize/[profesores|alumnos|asignaturas]/1: Get by id
/modulos/sequelize/[profesores|alumnos|asignaturas]/sql/1: Get by id using a SQL native query
/modulos/sequelize/[profesores|alumnos|asignaturas]/form: Form to add a new element to database
