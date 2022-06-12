const mysql = require('mysql');         //Instanciamos el paquete mysql para poder conectar la BD con el proyecto
const {promisify} = require('util');    //PROMISIFY es un módulo para el manejo de promesas (operaciones asincronas)

/* Configuración para la conexión a la base de Datos */
const connection = mysql.createPool({
    host:'localhost',
    user: 'master',                     
    password: '@master123',
    database: 'restaurante'
});

/* Conexión a Base de Datos */
connection.getConnection(
    (err, conn) => {
        if(err){
            console.log('DB no conectada');
        }
        if (conn) {
            console.log('DB conectada');
        }
        return;
    }
);

connection.query = promisify(connection.query); //Encapsulamos las operaciones a la BD dentro de PROMISIFY para utilizarlas de manera asincrona

module.exports = connection;                    //Exportamos, para poder utilizarlo a lo largo de nuestra aplicación