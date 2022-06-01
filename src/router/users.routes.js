const express = require('express');
const router = express.Router();
const path = require('path');
const { usersController } = require('../controllers/main.controller');
//se llama al middleware de login
const loginMiddleware = require('../middlewares/loginMiddleware');

//se requiere multer
const multer = require('multer');
const res = require('express/lib/response');

//se realiza la configuracion donde se guarda la imagen y su nombre
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/img/img-users'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-imgUser2022-worldMusic' + file.originalname + 'user' + path.extname(file.originalname));
    }
});

//se envia a una variable para usarse como middleware
const uploadFile = multer({ storage });

router.get('/iniciar-sesion', usersController.getLogin);

router.get('/registro', usersController.getRegister);

//se pone como middleware el uploadFile para indicar que se necesita subir una imagen
router.post('/registro', uploadFile.single('imagenusuario'), usersController.afterRegister);

router.get('/lista-usuarios', usersController.getUsers);

router.post('/iniciar-sesion', loginMiddleware,usersController.afterLogin);

router.get('/editar-usuario/:id_usuario', usersController.userToUpdate);

router.put('/editar-usuario/:id_usuario', usersController.userUpdated);

router.get('/eliminar-usuario/:id_usuario', usersController.UserToDelete);

router.delete('/eliminar-usuario/:id_usuario', usersController.UserDeleted);

module.exports = router;

