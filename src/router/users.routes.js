const express = require('express');
const router = express.Router();
const path = require('path');
const { usersController } = require('../controllers/main.controller');

router.get('/iniciar-sesion', usersController.getLogin);

router.get('/registro', usersController.getRegister);

module.exports = router;

