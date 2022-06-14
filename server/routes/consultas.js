const express = require('express');
const router = express.Router(); // Objeto que me ayuda a 
const connection = require('../connection');

// Funcion asincrona


// Órdenes por mesero con el total de venta para una fecha determinada
router.get('/consultas1', async (req, res) => {
    try{
        const query = 'SELECT ord_mes_id AS Mesero, COUNT(ord_id) AS Ordenes, SUM(ord_tot) AS Total_Venta, ord_fecha AS Fecha FROM orden GROUP BY Mesero, Fecha';
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


// Órdenes por mesa con el total de venta para una fecha determinada
router.get('/consultas2', async (req, res) => {
    try{
        const query = 'SELECT ord_mesa_id AS Mesa, COUNT(ord_id) AS Ordenes, SUM(ord_tot) AS Total_Venta, ord_fecha AS Fecha FROM orden GROUP BY Mesa, Fecha';
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

// El total de órdenes y de venta para una fecha determinada
router.get('/consultas3', async (req, res) => {
    try{
        const query = 'SELECT ord_fecha AS Fecha, COUNT(ord_id) AS Total_Ordenes, SUM(ord_tot) AS Total_Venta FROM orden GROUP BY Fecha';
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

// El total de venta por mes.
router.get('/consultas4', async (req, res) => {
    try{
        const query = 'SELECT MONTH(ord_fecha) AS Mes, SUM(ord_tot) AS Total_Venta FROM orden GROUP BY Mes';
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

// El total de venta por anio.
router.get('/consultas5', async (req, res) => {
    try{
        const query = 'SELECT YEAR(ord_fecha) AS Anio, SUM(ord_tot) AS Total_Venta FROM orden GROUP BY Anio';
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


// El total de venta por anio.
router.get('/consultas6', async (req, res) => {
    try{
        const query = 'SELECT MONTH(ord_fecha) AS Mes, SUM(ord_tot) AS Venta_Total FROM orden, detalle, producto WHERE det_ord_id = ord_id AND det_pro_id = pro_id AND pro_categoria = "carne" GROUP BY Mes';
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

// El total de venta de cerveza por dia
router.get('/consultas7', async (req, res) => {
    try{
        const query = 'SELECT pro_categoria AS Tipo_Producto, DAY(ord_fecha) AS Dia, SUM(ord_tot) AS Venta_Total FROM orden, detalle, producto WHERE det_ord_id = ord_id AND det_pro_id = pro_id AND pro_categoria = "Cerveza" GROUP BY Dia';
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


module.exports = router; // Exporta todas las rutas definidas arriba
