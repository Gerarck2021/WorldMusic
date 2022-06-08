const res = require('express/lib/response');
const data = require('./data/bd-music.json');

const artistaModelo = {
    getData: () => {
        return data;
    },

    getArtista: (apodo) => {
        return data.filter(artista => artista.apodo == apodo);
    },

    getCanciones: () => {
        // trae canciones
        // return data.map(cancion => cancion.canciones);
        // for(let i = 0; i < data.length; i++) {
        //     let nombres = data[i].canciones;
        //     for(let i = 0; i < nombres.length; i++) {
        //         console.log(nombres[i].nombre);
        //     }
        // }
        // return "Canciones obtenidas";
    }

}

module.exports = artistaModelo;