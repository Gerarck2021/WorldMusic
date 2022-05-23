const express = require('express');
const router = express.Router();
const path = require('path');
const { artistsController } = require('../controllers/main.controller');

router.get(`/`, artistsController.getArtistas);

router.get('/:apodo', artistsController.getArtistaEspecifico);

router.get('/:apodo/:id', artistsController.getSong);

router.get('/data', artistsController.getDataMusica);

router.get('/canciones', artistsController.getArtista);

module.exports = router;