DROP TABLE `matricula`;
DROP TABLE `asignatura`;
DROP TABLE `profesor`;
DROP TABLE `alumno`;

CREATE TABLE `alumno` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dni` varchar(9) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellidos` varchar(30) NOT NULL,
  `email` varchar(30) DEFAULT NULL,
  `fecha_nacimiento` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni_UNIQUE` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
ALTER TABLE `alumno` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;


CREATE TABLE `profesor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) DEFAULT NULL,
  `apellidos` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
ALTER TABLE `profesor` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;


CREATE TABLE `asignatura` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) DEFAULT NULL,
  `curso` int(11) DEFAULT NULL,
  `creditos` double(2,1) DEFAULT NULL,
  `profesor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `profesor_fk_idx` (`profesor_id`),
  CONSTRAINT `profesor_fk` FOREIGN KEY (`profesor_id`) REFERENCES `profesor` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `asignatura` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;


CREATE TABLE `matricula` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_alumno` int(11) DEFAULT NULL,
  `id_asignatura` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `alumno_fk_idx` (`id_alumno`),
  KEY `asignatura_fk_idx` (`id_asignatura`),
  CONSTRAINT `alumno_fk` FOREIGN KEY (`id_alumno`) REFERENCES `alumno` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `asignatura_fk` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
ALTER TABLE `matricula` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;




INSERT INTO `test`.`alumno` (`id`,`dni`,`nombre`,`apellidos`,`email`,`fecha_nacimiento`) VALUES (1,'11111111H','jose','perez','a@a.com','1980-01-01');
INSERT INTO `test`.`alumno` (`id`,`dni`,`nombre`,`apellidos`,`email`,`fecha_nacimiento`) VALUES (2,'22222222J','manuel','rodriguez','b@b.com','1985-08-10');
INSERT INTO `test`.`alumno` (`id`,`dni`,`nombre`,`apellidos`,`email`,`fecha_nacimiento`) VALUES (3,'33333333P','pedro','garcia','c@c.com','1982-12-05');


INSERT INTO `test`.`profesor` (`id`,`nombre`,`apellidos`) VALUES (1,'juan','lopez');
INSERT INTO `test`.`profesor` (`id`,`nombre`,`apellidos`) VALUES (2,'antonio','sanchez');
INSERT INTO `test`.`profesor` (`id`,`nombre`,`apellidos`) VALUES (3,'luis','vazquez');


INSERT INTO `test`.`asignatura`(`id`,`nombre`,`curso`,`creditos`,`profesor_id`) VALUES (1,'asignatura 1',1,9.0,1);
INSERT INTO `test`.`asignatura`(`id`,`nombre`,`curso`,`creditos`,`profesor_id`) VALUES (2,'asignatura 3',3,7.5,1);
INSERT INTO `test`.`asignatura`(`id`,`nombre`,`curso`,`creditos`,`profesor_id`) VALUES (3,'asignatura 3',5,6.0,2);


INSERT INTO `test`.`matricula`(`id`,`id_alumno`,`id_asignatura`) VALUES (1,1,1);
INSERT INTO `test`.`matricula`(`id`,`id_alumno`,`id_asignatura`) VALUES (2,1,2);

commit;