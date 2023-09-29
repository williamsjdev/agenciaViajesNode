import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
 

const app = express();

// Conectar la base de datos
db.authenticate() 
    .then(() => console.log('Base de datos conectada') )
    .catch( error => console.log(error) );

// Definir puertos 
const port = process.env.PORT || 4000;

// Habilitar Pug
app.set('view engine', 'pug');

// Obtener el año actual
app.use( (req, res, next) => {
    res.locals.unaVariable = 'Una nueva variable';
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes";
    next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta publica
app.use(express.static('public'));

// Agregar Router
app.use('/', router);

app.listen(port, () => {
    console.log(`El Servido esta funcionando en el puerto ${port}`)
});