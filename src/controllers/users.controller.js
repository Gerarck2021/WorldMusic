const path = require('path');
const userModel = require('../models/users.model');
const multer = require('multer');

const newId = () => {
	let ultimo = 0;
	userModel.getUsers().forEach(user => {
		if (user.id > ultimo){
			ultimo = user.id;
		}
	});
	return ultimo + 1
}

const usersController = {
    getLogin: (req, res) => {
        return res.render(path.resolve(__dirname, '../views/users/iniciar-sesion.ejs'));
    },

    getRegister: (req, res) => {
        return res.render(path.resolve(__dirname, '../views/users/registro.ejs'));
    },

    afterRegister: (req, res, next) => {

        const file = req.file.name;
        console.log(req.file.filename);
        if(!file) {
            const error = new Error('Tienes que insertar una imagen');
            error.httpStatusCode = 400;
            return next(error);
        }

        const newUser = {
            id: newId(),
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            telefono: req.body.telefono,
            email: req.body.email,
            clave: req.body.clave,
            confirmacionclave: req.body.confirmacionclave,
            rol: req.body.roles,
            interes: req.body.interes,
            imagenusuario: req.file.filename
        }

        userModel.createUser(newUser);
        console.log(newUser);
        console.log("Proceso Exitoso");
        res.redirect('/users/iniciar-sesion');
    },

    getUsers: (req, res) => {
        let usuarios = userModel.getUsers();
        return res.render(path.resolve(__dirname, '../views/users/listaUsuarios.ejs'), {usuarios});
    },

    afterLogin: (req, res) => {
        let condicion = userModel.afterLogin(req.body.email, req.body.clave);
        if(condicion) {
            return res.redirect('/');
        } else {
            return res.render(path.resolve(__dirname, '../views/users/iniciar-sesion.ejs'));
        }
    },

    userToUpdate: (req, res) => {
        let usuarios = userModel.getUsers();
        let idUserUrl = req.params.id_usuario;
        for(let i = 0; i < usuarios.length; i++) {
            if(idUserUrl <= 0 || idUserUrl > usuarios.length) {
                res.send("Usuario invalido");
                break;
            } else {
                res.render(path.resolve(__dirname, '../views/users/user-edit.ejs'), { usuario: userModel.getUsers()[idUserUrl - 1], usuarios });
                break;
            }
        }
    },

    userUpdated: (req, res) => {
        let idUserUrl = parseInt(req.params.id_usuario);
        let datosUsuario = {
            id: idUserUrl,
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            telefono: req.body.telefono,
            email: req.body.email,
            clave: req.body.clave,
            confirmacionclave: req.body.confirmacionclave,
            rol: req.body.roles,
            interes: req.body.interes == undefined ? null : req.body.interes
        }
        userModel.UserUpdate(idUserUrl, datosUsuario);
        console.log(datosUsuario);
        console.log(idUserUrl);
        res.redirect('/');
    },

    UserToDelete: (req, res) => {
        let idUserUrl = req.params.id_usuario;
        let usuarios = userModel.getUsers();
        for(let i = 0; i < usuarios.length; i++) {
            if(idUserUrl <= 0 || idUserUrl > usuarios.length) {
                res.send("Usuario no encontrado para eliminar")
                break;
            }
        }

        res.render(path.resolve(__dirname, '../views/users/delete-user.ejs'), {usuario: idUserUrl});
    },

    UserDeleted: (req, res) => {
        let idUserUrl = req.params.id_usuario;
        userModel.UserDelete(idUserUrl);
        res.redirect('/');
    }
}

module.exports = usersController;