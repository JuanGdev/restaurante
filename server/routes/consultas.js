const express = require('express');
const router = express.Router(); // Objeto que me ayuda a 
const connection = require('../connection');


// Funcion asincrona
router.get('/consulta1', async (req, res) => {
    try{
        const query = 'SELECT ord_mes_id AS Mesero, COUNT(ord_id) AS Ordenes, ord_tot AS total_venta, ord_fecha AS Fecha FROM orden GROUP BY Mesero, Fecha';
        // await espera a que termine de realizar la consulta
        const consul_1 = await connection.query(query); //Ejcuta la consulta definida
        console.log(consul_1);
        res.json(consul_1);
    }
    catch(error){
        res.json({
        error:error
        });
    }
    return;
});

router.delete('/eliminar_libro', async (req, res) => {
    try{
        const lib_id = req.body.lib_id;   //req.body; body es el que contiene toda la informacion que se le pasara a la peticion.
        const query = 'DELETE FROM libros WHERE lib_id = ?'; // ? ---> indica que vamos a insertar/reemplazar el ? por un valor
                                                        // El ? se debera reemplazar por la variable "lib_id" entonces:
        const result = await connection.query(query, [lib_id]); // de esta manera hacemos lo anterior
                // En otras palabras: "Toma esta query: DELETE FROM libros WHERE lib_id = ?, y donde se encuentre el ?
                // reemplaza por los valores que vienen en [lib_id]" Cada ? se va a reemplazar por los valores que tengamos en los arreglos, por ejemplo
                // tambien podemos tener:
            // const query = 'DELETE FROM libros WHERE lib_id = ?, ?';   
            // const result = await connection.query(query, [lib_id], [lib_titulo]);
            // Cada ? se reemplazara por el valor que tengamos en los arreglos
        
            res.json('ok');
    }
    catch(error){
        res.json({
            error:error
        });
    }
    return;
});

router.post('/nuevo_libro', async(req, res) => {
    try{
        const body = req.body;
        const query = 'INSERT INTO libros (lib_titulo, lib_autor, lib_editorial, lib_edicion) VALUES (?, ?, ?, ?)';
        await connection.query(query, [body.lib_titulo, body.lib_autor, body.lib_editorial, body.lib_edicion]);
        res.json('ok');
    }
    catch(error){
        res.json({
            error:error
        });
    }
});

module.exports = router; // Exporta todas las rutas definidas arriba