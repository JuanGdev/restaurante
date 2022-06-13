const express = require('express');
const router = express.Router();
const connection = require('../connection');

// Funcion asincrona
router.get("/todas_las_mesas", async (req, res) => {
    try{
        const query = 'SELECT * FROM mesa';
        // await espera a que termine de realizar la consulta
        const mesas = await connection.query(query); //Ejecuta la consulta definida
        res.json(mesas); //respuesta de la funcion en formato json 
        return;
    }
    catch(error){
        res.json ({
            error:error
        });
    }
    return;
});
router.delete('/eliminar_mesa', async (req,res)=>{
    try{
        const mesa_id = req.body.mesa_id;
        const query = 'DELETE FROM mesa WHERE mesa_id = ?';
        const result = await connection.query(query, [mesa_id]);
        res.json('ok');
    }
    catch(error){
        res.json ({
            error:error
        });
    }
    return;
});

router.post('/nueva_mesa', async (req, res)=>{
    try{
        const body = req.body;
        const query = 'INSERT INTO mesa (mesa_capacidad, mesa_estatus) VALUES (?, ?)';
        await connection.query(query, [body.mesa_capacidad, body.mesa_estatus]);
        res.json('ok');
    }
    catch(error){
        res.json({
            error:error
        });
    }
    return;
});
module.exports = router; //Exporta todas las rutas definidas arriba

