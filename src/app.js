const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const { indexRoutes, artistsRoutes, usersRoutes} = require('./router/main.routes');

//exponiendo carpeta publica
app.use(express.static(path.resolve(__dirname, '../public')));

app.use('/', indexRoutes); 

app.use('/artistas', artistsRoutes);

app.use('/users', usersRoutes);



app.get('/mon-laferte', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/video-mon-laferte.html'));
});

app.get('/natalia-lafourcade', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/video-natalia-lafourcade.html'));
});

app.get('/carla-morrinson', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/video-carla-morrinson.html'));
});

app.listen(port, console.log(`Servidor corriendo en el puerto ${port}`));