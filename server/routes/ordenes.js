const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get("/todas_las_ordenes", async (req, res) => {
    try{
        const query = 'SELECT * FROM orden';
        const ordenes = await connection.query(query);
        //console.log(ordenes);
        res.json(ordenes);    
    }
    catch(error){
        res.json({
            error:error
        });
    }
    return;
});

router.delete('/eliminar_orden', async (req,res) => {
    try{
        const ord_id = req.body.ord_id;
        const query = 'DELETE FROM orden WHERE ord_id = ?';
        await connection.query(query, [ord_id]);
        //console.log(result);
        res.json('ok');
    }
    catch(error){
        res.json ({
            error:error
        });
    }
    return;
});

router.put('/estadopagado', async (req,res) => {
    try{
        const ord_id = req.body.ord_id;
        const query = 'UPDATE orden SET ord_estado = "Cerrada" WHERE ord_id = ?';
        console.log(ord_id);
        const result = await connection.query(query, [ord_id]);
        //console.log(result);
        res.json(result);
    }
    catch(error){
        res.json ({
            error:error
        });
    }
    return;
});

module.exports = router;