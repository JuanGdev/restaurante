const express =  require('express');    //Importa el paquete express (como clase)
const app = express();                  //Aquí se instancia 
const morgan = require('morgan');       //Importamos MORGAN
const cors = require('cors');           //Importamos CORS
const path = require('path');           //Importamos PATH
const history = require('connect-history-api-fallback');

/* FUNCIONES MIDDLEWARE */
app.use(morgan('tiny'));                                    //Especificamos como es que nos muestre la información de las peticiones HTTP
app.use(cors());  
app.use(history());                                          //CORSE nos ayudará a acceder a los recursos desde diferentes rutas
app.use(express.json());                                   //Con esta instrucción le diremos a EXPRESS que utilice el formato JSON para la información de las peticiones (req, res)
app.use(express.urlencoded({extended:true}));               //Con esta instrucción permitimos pasar información por medio de la URL
app.use(express.static(path.join(__dirname, 'public')));    //Sirve para manejar los paths de forma relativa (evita escribir los paths completos e.j. 'D:\Universidad\DAS\code\biblioteca\server')
app.use('/detalles', require('./routes/detalles'));
app.use('/mesas', require('./routes/mesas'));
app.use('/meseros', require('./routes/meseros'));
app.use('/ordenes', require('./routes/ordenes'));
app.use('/productos', require('./routes/productos'));

app.listen(3000, function(){            //Con esta instrucción definimos cual puerto
    console.log('API ejecutandose');  //es el que estará escuchando y el mensaje en
});                                     //en caso de que sea exitoso este procedimiento
