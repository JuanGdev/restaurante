const express = require('express');
const router = express.Router();
const connection = require('../connection');

// Funcion asincrona
router.get("/todos_los_meseros", async (req, res) => {
    try{
        const query = 'SELECT * FROM mesero';
        // await espera a que termine de realizar la consulta
        const meseros = await connection.query(query); //Ejecuta la consulta definida
        res.json(meseros); //respuesta de la funcion en formato json 
        return;
    }
    catch(error){
        res.json ({
            error:error
        });
    }
    return;
});
router.delete('/eliminar_mesero', async (req,res)=>{
    try{
        const mes_id = req.body.mes_id;
        const query = 'DELETE FROM mesero WHERE mes_id = ?';
        const result = await connection.query(query, [mes_id]);
        res.json('ok');
    }
    catch(error){
        res.json ({
            error:error
        });
    }
    return;
});

router.post('/nuevo_mesero', async (req, res)=>{
    try{
        const body = req.body;
        const query = 'INSERT INTO mesero (mes_nombre, mes_ap_pat, mes_ap_mat) VALUES (?, ?, ?)';
        await connection.query(query, [body.mes_nombre, body.mes_ap_pat, body.mes_ap_mat]);
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
