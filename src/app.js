const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const methodOverride = require('method-override');
const { indexRoutes, artistsRoutes, usersRoutes} = require('./router/main.routes');
//se requiere el middleware a nivel aplicacion
// const logMiddlewareApplication = require('./middlewares/logMiddlewareApplication');

//para metodos de modificar y eliminar datos
app.use(methodOverride('_method'));

//indicar que queremos ese template engine
app.set('views',path.resolve(__dirname,'./views'))
app.set('view engine', 'ejs');

//exponiendo carpeta publica
app.use(express.static(path.resolve(__dirname, '../public')));

//para el envio o transferencia de datos
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//decimos que queremos usar el middleware de aplicacion
// app.use(logMiddlewareApplication);

//manejo de uso de las rutas
app.use('/', indexRoutes); 

app.use('/artistas', artistsRoutes);

app.use('/users', usersRoutes);

//error 404
app.use((req, res, next) => {
    res.status(404).render(path.resolve(__dirname, './views/not-found-page.ejs'));
});

//poner en escucha al servidor
app.listen(port, console.log(`Servidor corriendo en el puerto ${port}`));