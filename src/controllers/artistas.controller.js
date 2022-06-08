const req = require('express/lib/request');
const path = require('path');
const dataModel = require('../models/index.model');
const data = require('../models/data/bd-music.json');

const artistsController = {
    getArtistas: (req, res) => {
        let datos = dataModel.getData();
        return res.render(path.resolve(__dirname, '../views/artistas/artistas.ejs'), {datos});
    },

    getArtistaEspecifico: (req, res) => {
        let datos = dataModel.getData();
        let ArtistaEspecifico = dataModel.getArtista(req.params.apodo);
        return res.render(path.resolve(__dirname, '../views/artistas/artista-especifico.ejs'), {datos, ArtistaEspecifico});
    },

    getDataMusica: (req, res) => {
        let datos = dataModel.getData();
        console.log(datos);
        return res.render(path.resolve(__dirname, '../views/artistas/vista-dinamica.ejs'), {datos: dataModel.getData()});
    },

    getArtista: (req, res) => {
        // for(let i = 0; i < data.length; i++) {
        //     let nombres = data[i].canciones;
        //     for(let i = 0; i < nombres.length; i++) {
        //         console.log(nombres[i].nombre);
        //     }
        // }

        // let nombresCanciones = data.map((artista, i) => {
        //     let nombres = artista.canciones;
        //     let extraccionNombres = nombres.map((nombre, i) => {
        //         let nameSong = nombre.nombre;
        //         return nameSong;
        //     })
        //     return extraccionNombres;
        // });

        let artistas = dataModel.getArtista();


        // let canciones = dataModel.getCanciones();
        // console.log(canciones);
        return res.render(path.resolve(__dirname, '../views/artistas/vista-ejemplo.ejs'), {artistas: artistas})
    },

    getSong: (req, res) => {
        let datos = dataModel.getData();
        let id = req.params.id - 1;
        return res.render(path.resolve(__dirname, '../views/artistas/video-mon-laferte.ejs'), {datos, id});
    }
}

module.exports = artistsController;