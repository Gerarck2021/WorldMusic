const express = require('express');
const router = express.Router();
const path = require('path');
const { usersController } = require('../controllers/main.controller');

router.get('/iniciar-sesion', usersController.getLogin);

router.get('/registro', usersController.getRegister);

router.post('/registro', usersController.afterRegister);

router.get('/lista-usuarios', usersController.getUsers);

router.post('/iniciar-sesion', usersController.afterLogin);

router.get('/editar-usuario/:id_usuario', usersController.userToUpdate);

router.put('/', usersController.userUpdated);

router.get('/eliminar-usuario/:id_usuario', usersController.UserToDelete);

router.delete('/eliminar-usuario/:id_usuario', usersController.UserDeleted);

module.exports = router;

