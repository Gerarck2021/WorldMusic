const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const methodOverride = require('method-override');
const { indexRoutes, artistsRoutes, usersRoutes} = require('./router/main.routes');

//para metodos de modificar y eliminar datos
app.use(methodOverride('_method'));

//exponiendo carpeta publica
app.use(express.static(path.resolve(__dirname, '../public')));

//para el envio o transferencia de datos
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//manejo de uso de las rutas
app.use('/', indexRoutes); 

app.use('/artistas', artistsRoutes);

app.use('/users', usersRoutes);

//poner en escucha al servidor
app.listen(port, console.log(`Servidor corriendo en el puerto ${port}`));