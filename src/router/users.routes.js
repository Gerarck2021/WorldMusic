const express = require('express');
const router = express.Router();
const path = require('path');
const { usersController } = require('../controllers/main.controller');
//se llama al middleware de login
const loginMiddleware = require('../middlewares/loginMiddleware');
//se llama body de express-validator
const { body } = require('express-validator');

//se crea array de validaciones al registrar usuarios
const validacionesRegistroUsuarios = [
    body('nombres')
    .notEmpty()
    .withMessage('Debes ingresar al menos un nombre'),
    body('apellidos')
    .notEmpty()
    .withMessage('Debes ingresar al menos un apellido'),
    body('telefono')
    .notEmpty()
    .withMessage('Debes ingresar un telefono valido'),
    body('email')
    .isEmail()
    .withMessage('Debes ingresar un correo valido'),
    body('clave')
    .notEmpty()
    .withMessage('Debes ingresar una clave valida'),
    body('confirmacionclave')
    .notEmpty()
    .withMessage('Debes ingresar una clave valida'),
    body('roles')
    .custom((value, { req }) => {
        let valueRol = req.body.roles;

        if(valueRol == 0) {
            throw new Error('Debes seleccionar un rol');
        }

        return true;
    }),
    body('interes')
    .notEmpty()
    .withMessage('Debes ingresar al menos un interes'),
    body('imagenusuario')
    .custom((value, { req }) => {
        let file = req.file;
        console.log(file);
        let acceptedExtensions = ['.jpg', '.png', '.jpeg', '.gif'];

        if(!file) {
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)) {
                throw new Error('Las extensiones de archivo permitidas son ' + acceptedExtensions.join(', '));
            }
        }

        

        return true;
    })
];

//se crea array de validaciones al modificar usuarios
const validacionesModificacionUsuarios = [
    body('nombres')
    .notEmpty()
    .withMessage('Debes ingresar al menos un nombre'),
    body('apellidos')
    .notEmpty()
    .withMessage('Debes ingresar al menos un apellido'),
    body('telefono')
    .notEmpty()
    .withMessage('Debes ingresar un telefono valido'),
    body('email')
    .isEmail()
    .withMessage('Debes ingresar un correo valido'),
    body('clave')
    .notEmpty()
    .withMessage('Debes ingresar una clave valida'),
    body('confirmacionclave')
    .notEmpty()
    .withMessage('Debes ingresar una clave valida'),
    body('roles')
    .custom((value, { req }) => {
        let valueRol = req.body.roles;

        if(valueRol == 0) {
            throw new Error('Debes seleccionar un rol');
        }

        return true;
    }),
    body('interes')
    .custom((value, { req }) => {
        let interes = req.body.interes;

        if(interes.length == 0 || interes == undefined){
            return "Debes ingresar al menos un interes";
        }

        return true;
    }),
    body('imagenusuariomodificado')
    .custom((value,{req}) =>{
            let file = req.file
            if(!file){
                throw new Error('Tienes que subir una imagen')
            }else{
                let fileExtension = path.extname(file.originalname)
                let acceptedExtensions = ['.jpg', '.png', '.gif','.jpeg'];
                if (!acceptedExtensions.includes(fileExtension)){
                    throw new Error(`Las extenciones de archivo permitidas son ${acceptedExtensions.join(',')}`)
                }
            }
            return true;
        })
];



//se requiere multer
const multer = require('multer');

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
router.post('/registro', uploadFile.single('imagenusuario'), validacionesRegistroUsuarios, usersController.afterRegister);

router.get('/lista-usuarios', usersController.getUsers);

router.post('/iniciar-sesion', loginMiddleware,usersController.afterLogin);

router.get('/editar-usuario/:id_usuario', usersController.userToUpdate);

router.put('/editar-usuario/:id_usuario', uploadFile.single('imagenusuariomodificado'), validacionesModificacionUsuarios, usersController.userUpdated);

router.get('/eliminar-usuario/:id_usuario', usersController.UserToDelete);

router.delete('/eliminar-usuario/:id_usuario', usersController.UserDeleted);

module.exports = router;

