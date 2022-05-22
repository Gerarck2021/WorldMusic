const req = require('express/lib/request');
const path = require('path');
const dataModel = require('../models/index.model');

const artistsController = {
    getArtistas: (req, res) => {
        return res.sendFile(path.resolve(__dirname, '../views/artistas.html'));
    },

    getMonLaferte: (req, res) => {
        return res.sendFile(path.resolve(__dirname, '../views/artista-especifico.html'));
    },

    getNataliaLafourcade: (req, res) => {
        return res.sendFile(path.resolve(__dirname, '../views/natalia-lafourcade.html'));
    },

    getCarlaMorrinson: (req, res) => {
        return res.sendFile(path.resolve(__dirname, '../views/carla-morrinson.html'));
    },

    getDataMusica: (req, res) => {
        let datos = dataModel.getData();
        console.log(datos);
        return res.render(path.resolve(__dirname, '../views/vista-dinamica.ejs'), {datos: dataModel.getData()});
    },

    getArtista: (req, res) => {
        let canciones = dataModel.getCanciones();
        console.log(canciones);
        return res.render(path.resolve(__dirname, '../views/vista-ejemplo.ejs'), {canciones: canciones})
    },

    getSong: (req, res) => {
        return res.sendFile(path.resolve(__dirname, '../views/video-mon-laferte.html'));
    }
}

module.exports = artistsController;