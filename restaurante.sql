CREATE DATABASE IF NOT EXISTS restaurante;

USE restaurante;

CREATE TABLE IF NOT EXISTS mesa (
	mesa_id TINYINT NOT NULL,
    mesa_capacidad TINYINT NOT NULL,
    mesa_estatus BOOLEAN NOT NULL,
    
    PRIMARY KEY (mesa_id),
    INDEX (mesa_id, mesa_capacidad)
);

CREATE TABLE IF NOT EXISTS mesero(
	mes_id TINYINT NOT NULL AUTO_INCREMENT,
    mes_mesa_id TINYINT,
    
    PRIMARY KEY (mes_id),
    
	CONSTRAINT fk_mesa_mesero
		FOREIGN KEY (mes_mesa_id)
        REFERENCES mesa(mesa_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS orden(
	ord_id INT NOT NULL AUTO_INCREMENT,
    ord_total INT NOT NULL COMMENT 'Costo total en pesos mexicanos de la orden',
    ord_mesa_id TINYINT,
    ord_mes_id TINYINT,
    
    PRIMARY KEY (ord_id),
    
	CONSTRAINT fk_mesa_orden
		FOREIGN KEY (ord_mesa_id)
		REFERENCES mesa (mesa_id)
		ON UPDATE CASCADE
        ON DELETE RESTRICT,
        
	UNIQUE (ord_mesa_id, ord_mes_id)
);

CREATE TABLE IF NOT EXISTS producto(
	pro_id INT NOT NULL AUTO_INCREMENT,
    pro_cat ENUM('ensaladas','sopas','carnes','pescado','postres','especiales'),
    pro_precio INT NOT NULL,
    pro_descripcion VARCHAR (50) NOT NULL,
    pro_mesa_id TINYINT,
    
    PRIMARY KEY (pro_id)
    
/*
	CONSTRAINT fk_mesa_pro
		FOREIGN KEY (pro_mesa_id)
        REFERENCES mesa (mesa_id)
		ON UPDATE
        ON DELETE
*/
);