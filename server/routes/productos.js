const express = require('express');
const router = express.Router();
const connection = require('../connection');

// Funcion asincrona
router.get("/todos_los_productos", async (req, res) => {
    try{
        const query = 'SELECT * FROM producto';
        // await espera a que termine de realizar la consulta
        const productos = await connection.query(query); //Ejecuta la consulta definida
        res.json(productos); //respuesta de la funcion en formato json 
        return;
    }
    catch(error){
        res.json ({
            error:error
        });
    }
    return;
});
router.delete('/eliminar_producto', async (req,res)=>{
    try{
        const pro_id = req.body.pro_id;
        const query = 'DELETE FROM producto WHERE pro_id = ?';
        const result = await connection.query(query, [pro_id]);
        res.json('ok');
    }
    catch(error){
        res.json ({
            error:error
        });
    }
    return;
});

router.post('/nuevo_producto', async (req, res)=>{
    try{
        const body = req.body;
        const query = 'INSERT INTO producto (pro_nombre, pro_desc, pro_costo, pro_cob, pro_categoria) VALUES (?, ?, ?, ?, ?)';
        await connection.query(query, [body.pro_nombre, body.pro_desc, body.pro_costo, body.pro_cob, body.pro_categoria]);
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
