const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get("/detalles_de_una_orden/:ord_id", async (req, res) => {
    try{
        const ord_id = req.params.ord_id;
        const query = 'SELECT p.pro_nombre AS Nombre, ' +
            'p.pro_desc AS Descripcion, ' +
            'p.pro_cob AS Tipo, ' +
            'p.pro_categoria AS Categoria, ' + 
            'd.det_comentario AS Comentario, ' +
            'p.pro_costo AS Costo ' + 
            'FROM orden AS o, detalle AS d, producto AS p ' +
            'WHERE d.det_ord_id = o.ord_id ' +
            'AND p.pro_id = d.det_pro_id ' +
            'AND o.ord_id = ?'
        const detalles = await connection.query(query, [ord_id]);
        res.json(detalles);
    }
    catch(error){
        res.json({
            error:error
        });
    }
    return;
});

router.post("/agregar_detalles", async (req,res) => {
    try {
        const detalles_query = req.body;
        console.log('a');
        const query = 'INSERT INTO detalle (det_ord_id,det_pro_id, det_comentario) VALUES (?,?,?)'
        const detalles = await connection.query(query, [detalles_query.det_pro_id, detalles_query.det_comentario]);
        console.log(detalles);
        res.json(detalles);
    } catch (error) {
        res.json({
            error:error
        });
    }
});

router.get("/total/:ord_id", async (req, res) => {
    try{
        const ord_id = req.params.ord_id;
        const query = 'SELECT SUM(p.pro_costo) as Total ' +
        'FROM orden AS o, detalle AS d, producto AS p ' +
        'WHERE d.det_ord_id = o.ord_id AND p.pro_id = d.det_pro_id AND o.ord_id = ?'
        const detalles = await connection.query(query, [ord_id]);
        console.log(detalles);
        res.json(detalles);
    }
    catch(error){
        res.json({
            error:error
        });
    }
    return;
});

module.exports = router;