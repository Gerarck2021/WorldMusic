const path = require('path');
const userModel = require('../models/users.model');

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
        return res.sendFile(path.resolve(__dirname, '../views/iniciar-sesion.html'));
    },

    getRegister: (req, res) => {
        return res.sendFile(path.resolve(__dirname, '../views/registro.html'));
    },

    afterRegister: (req, res) => {

        const newUser = {
            id: newId(),
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            telefono: req.body.telefono,
            email: req.body.email,
            clave: req.body.clave,
            confirmacionclave: req.body.confirmacionclave,
            rol: req.body.roles,
            interes: req.body.interes
        }
        userModel.createUser(newUser);
        console.log(newUser);
        res.redirect('/users/iniciar-sesion');
    },

    getUsers: (req, res) => {
        let usuarios = userModel.getUsers();
        return res.render(path.resolve(__dirname, '../views/listaUsuarios.ejs'), {usuarios});
    },

    afterLogin: (req, res) => {
        let condicion = userModel.afterLogin(req.body.email, req.body.clave);
        if(condicion) {
            return res.redirect('/');
        } else {
            return res.sendFile(path.resolve(__dirname, '../views/iniciar-sesion.html'));
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
                res.render(path.resolve(__dirname, '../views/user-edit.ejs'), { usuario: userModel.getUsers()[idUserUrl - 1], usuarios });
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
            interes: req.body.interes
        }
        userModel.UserUpdate(req.params.id_usuario, datosUsuario);
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

        res.render(path.resolve(__dirname, '../views/delete-user.ejs'), {usuario: idUserUrl});
    },

    UserDeleted: (req, res) => {
        let idUserUrl = req.params.id_usuario;
        userModel.UserDelete(idUserUrl);
        res.redirect('/');
    }
}

module.exports = usersController;