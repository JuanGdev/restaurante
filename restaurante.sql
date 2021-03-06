CREATE DATABASE IF NOT EXISTS restaurante_db;

USE restaurante_db;

CREATE TABLE IF NOT EXISTS mesa(
	mesa_id TINYINT NOT NULL AUTO_INCREMENT, 
    mesa_capacidad TINYINT NOT NULL,
    mesa_estatus ENUM('Ocupada','Libre'),
    
    PRIMARY KEY (mesa_id),			#Utilizaremos una llave artificial dado que el manejo por numero de mesas será más eficiente e intuitivo para el sistema
    INDEX (mesa_capacidad),
    INDEX (mesa_id)         
);

CREATE TABLE IF NOT EXISTS mesero(
	mes_id TINYINT NOT NULL AUTO_INCREMENT,
    mes_nombre VARCHAR (35) NOT NULL,
    mes_ap_pat VARCHAR (35) NOT NULL,
    mes_ap_mat VARCHAR (35),
    
    PRIMARY KEY (mes_id),			#Es más eficiente manejar a los meseros por una llave artificial dado a que puede existir más de una persona con el
    INDEX (mes_nombre, mes_ap_pat)  #mismo nombre, por esto mismo es mejor evitar posibles errores en la base de datos y asignar un ID a cada uno de ellos
);


CREATE TABLE IF NOT EXISTS producto(
	pro_id INT NOT NULL AUTO_INCREMENT,
    pro_nombre VARCHAR(50) NOT NULL,
    pro_desc VARCHAR(150) NOT NULL COMMENT'Descripción del producto y de qué es lo que lleva',
    pro_costo INT NOT NULL COMMENT 'En pesos MXN',
    pro_cob ENUM ('Comida','Bebida') NOT NULL COMMENT 'COB(comida o bebida)',
    pro_categoria ENUM ('Garnacha','Caldo','Carne','Postre','Agua','Cerveza','Licor','Refresco', 'Bebida Caliente'),

    
    PRIMARY KEY (pro_id),                       #Se pretende que habrá muchos productos, por lo cual, una llave artificial ayuda a el manejo eficiente
    UNIQUE (pro_nombre, pro_costo, pro_cob),    #de la información y evita reduncdancias dentro de la base de datos
    INDEX (pro_nombre),
    INDEX (pro_categoria)
);


CREATE TABLE IF NOT EXISTS orden(
	ord_id INT NOT NULL AUTO_INCREMENT,
    ord_mesa_id TINYINT,
    ord_mes_id TINYINT,
    ord_estado ENUM ('abierta','cerrada','pagada') NOT NULL,
    ord_fecha DATETIME NOT NULL,
    ord_productos VARCHAR(300) NOT NULL COMMENT'Campo utilizado para describir los productos que se compraron y el precio de cada uno, sirve como desglose de toda la orden',
    ord_tot INT NOT NULL,
    
    PRIMARY KEY (ord_id),       #Se espera tener muchas ordenes, por lo cual al ser demasiada información el uso de una llave artificial resulta          
    INDEX (ord_fecha),          #una buena elección, además que las busquedas para cada una de estas sería más eficiente y el manejo de los datos más práctico
    
    CONSTRAINT fk_mesa_orden
    FOREIGN KEY (ord_mesa_id)
    REFERENCES mesa(mesa_id)
		ON DELETE RESTRICT 		#Decidimos utilizar RESTRICT porque de esta manera podemos contralar el estado para cada orden y determinar si se puede eliminar una mesa o no
        ON UPDATE CASCADE, 		#Decidimos utilizar CASCADE porque el actualizar la mesa no afecta la integridad de los datos
	
    CONSTRAINT fk_mesero_orden
    FOREIGN KEY (ord_mes_id)
    REFERENCES mesero(mes_id)
		ON DELETE RESTRICT		#Al utilizar RESTRICT podemos controlar el estado de las ordenes, además de que no podríamos eliminar ningún mesero mientras tenga ordenes con estado "abierta"
        ON UPDATE CASCADE		#Con CASCADE no afecta de manera negativa a los datos de la orden si los actualizamos
);

CREATE TABLE IF NOT EXISTS detalle(
	det_ord_id INT,
    det_pro_id INT,
    det_comentario VARCHAR(80) NOT NULL,
    
    CONSTRAINT fk_orden_detalle
    FOREIGN KEY (det_ord_id)
    REFERENCES orden(ord_id)
		ON DELETE CASCADE 		#Sería irrelevante guardar los detalles de una orden que ya no existe
        ON UPDATE CASCADE,		#Es necesario tener la información actualizada porque son los detalles de la misma orden
	CONSTRAINT fk_producto_detalle
    FOREIGN KEY (det_pro_id)
    REFERENCES producto(pro_id)
		ON DELETE CASCADE		#Al eliminar productos de la base no es necesario guardar los detalles de la orden en donde se ordenaron, ya que las cuentas que están pagadas no son afectadas, sólo las de estado abierto o cerrado
        ON UPDATE CASCADE		#El actualizar los datos de un producto no afecta a esta tabla de manera negativa
);

# Inserciones inciales de datos para la base de datos
INSERT INTO mesa (mesa_capacidad,mesa_estatus) 
VALUES	('20', 'Libre'),
		('17', 'Libre'),
		('15', 'Libre'),
		('13', 'Libre'),
		('11','Libre'),
		('9', 'Libre'),
		('7', 'Libre'),
		('5', 'Libre'),
		('3', 'Libre');

INSERT INTO mesero (mes_nombre, mes_ap_pat, mes_ap_mat) 
	VALUES ('Samantha','Squash','Pérez'),
	('Fernanda','Colunga','Ramírez'),
	('Solaire','Aguilar','Ávila'),
	('Hornet','Amador','Gómez'),
	('Pedro','Pérez','Prado'),
	('Idalid','Segoviano','Gudiño'),
	('Natalia','Hernández','González'),
	('Naomi','Gutiérrez','Arango'),
	('Pablo','Cinefilio','Haceres'),
	('Jair','Chávez','Playas');

INSERT INTO `restaurante_db`.`producto` (`pro_id`, `pro_nombre`, `pro_desc`, `pro_costo`, `pro_cob`, `pro_categoria`) VALUES ('1', 'Caldo de pollo', 'Caldo de pollo con arroz y verduras', '65', 'Comida', 'Caldo');
INSERT INTO `restaurante_db`.`producto` (`pro_id`, `pro_nombre`, `pro_desc`, `pro_costo`, `pro_cob`, `pro_categoria`) VALUES ('2', 'Pambazo de chorizo con papas', 'Pambazo acompañado de frijoles, chorizo, papas, lechuga y crema', '55', 'Comida', 'Garnacha');
INSERT INTO `restaurante_db`.`producto` (`pro_id`, `pro_nombre`, `pro_desc`, `pro_costo`, `pro_cob`, `pro_categoria`) VALUES ('3', 'Copa de licor de caña', 'Contiene fino licor de caña marca Tonayan', '299', 'Bebida', 'Licor');
INSERT INTO `restaurante_db`.`producto` (`pro_id`, `pro_nombre`, `pro_desc`, `pro_costo`, `pro_cob`, `pro_categoria`) VALUES ('4', 'Agua de limón', 'Agua fresca de limón (500 ml)', '25', 'Bebida', 'Agua');
INSERT INTO `restaurante_db`.`producto` (`pro_id`, `pro_nombre`, `pro_desc`, `pro_costo`, `pro_cob`, `pro_categoria`) VALUES ('5', 'Pepsi de limón', 'Refresco sabor limón', '1', 'Bebida', 'Refresco');
INSERT INTO `restaurante_db`.`producto` (`pro_id`, `pro_nombre`, `pro_desc`, `pro_costo`, `pro_cob`, `pro_categoria`) VALUES ('6', 'Carne de res con chile rojo y frijoles', 'Plato con carne de res y salsa roja acompañada de frijoles y queso fresco', '75', 'Comida', 'Carne');

INSERT INTO orden (ord_mesa_id, ord_mes_id, ord_estado, ord_fecha, ord_productos, ord_tot)
	VALUES	('1', '1','pagada','2022-05-30 13:20:00', "Pambazo de chorizo con papas", 65),
			('3', '10','pagada','2022-05-31 14:15:00', "Café de olla", 30),
            ('5', '5','pagada','2022-06-01 18:10:00', "Carnitas", 80),
            ('7', '8','pagada','2022-06-01 21:00:00', "Mole de olla", 120),
            ('9', '3','pagada','2022-06-04 07:40:00', "Cerveza Corona 500 ml", 100);

INSERT INTO detalle(det_ord_id, det_pro_id, det_comentario)
	VALUES (2, 2, 'Media cucharada de azucar'),
			(3, 3, 'Sin cueritos'),
            (4, 4, 'Sin ajonojolí'),
            (5, 5, 'Tibia');