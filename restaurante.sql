CREATE DATABASE IF NOT EXISTS restaurante;

USE restaurante;

CREATE TABLE IF NOT EXISTS mesa(
	mesa_id TINYINT NOT NULL AUTO_INCREMENT,
    mesa_capacidad TINYINT NOT NULL,
    mesa_estatus BOOLEAN NOT NULL,
    
    PRIMARY KEY (mesa_id),
    INDEX (mesa_capacidad, mesa_id)
);

CREATE TABLE IF NOT EXISTS mesero(
	mes_id TINYINT NOT NULL AUTO_INCREMENT,
    mes_nombre VARCHAR (35) NOT NULL,
    mes_ap_pat VARCHAR (35) NOT NULL,
    mes_ap_mat VARCHAR (35),
    
    PRIMARY KEY (mes_id)
);


CREATE TABLE IF NOT EXISTS producto(
	pro_id INT NOT NULL AUTO_INCREMENT,
    pro_nombre VARCHAR(50) NOT NULL,
    pro_costo INT NOT NULL,
    pro_cob ENUM ('comida','bebida') NOT NULL COMMENT 'COB(comida o bebida)' ,
    pro_categoria ENUM ('garnacha','caldo','carne','postre','agua','cerveza','licor','refresco'),
    
    PRIMARY KEY (pro_id),
    INDEX (pro_nombre, pro_costo, pro_cob),
    INDEX (pro_nombre, pro_categoria)
    
    
);


CREATE TABLE IF NOT EXISTS orden(
	ord_id INT NOT NULL AUTO_INCREMENT,
    ord_mesa_id TINYINT,
    ord_mes_id TINYINT,
    ord_estado ENUM ('abierta','cerrada','pagada') NOT NULL,
    ord_fecha DATETIME NOT NULL,
    
    PRIMARY KEY (ord_id),
    
    CONSTRAINT fk_mesa_orden
    FOREIGN KEY (ord_mesa_id)
    REFERENCES mesa(mesa_id),
		# ON DELETE
        # ON UPDATE
	
    CONSTRAINT fk_mesero_orden
    FOREIGN KEY (ord_mes_id)
    REFERENCES mesero(mes_id)
		# ON DELETE 
        # ON UPDATE
);

CREATE TABLE IF NOT EXISTS detalle(
	det_ord_id INT,
    det_pro_id INT,
    det_comentario VARCHAR(80) NOT NULL,
    
    CONSTRAINT fk_orden_detalle
    FOREIGN KEY (det_ord_id)
    REFERENCES orden(ord_id),
		# ON DELETE
        # ON UPDATE
	CONSTRAINT fk_producto_detalle
    FOREIGN KEY (det_pro_id)
    REFERENCES producto(pro_id)
		# ON DELETE
        # ON UPDATE
);