const express = require('express');
const router = express.Router();
const path = require('path');
const { artistsController } = require('../controllers/main.controller');

router.get('/', artistsController.getArtistas);

router.get('/mon-laferte', artistsController.getMonLaferte);

router.get('/natalia-lafourcade', artistsController.getNataliaLafourcade);

router.get('/carla-morrinson', artistsController.getCarlaMorrinson);

router.get('/data', artistsController.getDataMusica);

router.get('/canciones', artistsController.getArtista);

module.exports = router;