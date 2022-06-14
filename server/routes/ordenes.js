const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get("/todas_las_ordenes", async (req, res) => {
    try{
        const query = 'SELECT ' +
                        'o.ord_id, mesa.mesa_id, mes.mes_id, ' +
                        'o.ord_fecha, o.ord_productos ' +
                        'FROM orden AS o, mesa, mes ' +
                        'WHERE (o.ord_id = mesa.mesa_id) AND (mesa.mesa_id = mes.mes_id)';        
        const orden_det = await connection.query(query);
        res.json(orden_det);
    }
    catch(error){
        res.json({
            error:error
        });
    }
});

router.post('/nueva_orden', async(req, res) => {
    try{
        const body = req.body;
        const query =   'INSERT INTO orden ' +
                        '(ord_mesa_id, ord_mes_id, ord_estado, ord_fecha, ord_productos, ord_tot) ' +
                        'VALUES (?,?,?,?,?,?)';
        connection.query(query, [body.ord_mesa_id, body.ord_mes_id, body.ord_estado, body.ord_fecha, body.ord_productos, body.ord_tot]);
        res.json('ok');
    }
    catch(error){
        res.json({
            error:error
        });
    }
});

router.delete('/eliminar_orden', async (req,res) => {
    try{
        const ord_id = req.body.ord_id;
        const query = 'DELETE FROM orden WHERE ord_id = ?';
        const result = await connection.query(query, [ord_id]);
        res.json('ok');
    }
    catch(error){
        res.json ({
            error:error
        });
    }
    return;
});

module.exports = router;