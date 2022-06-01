//Middleware de login, es a nivel ruta
const data = require('../models/data/bd-users.json');
const userModel = require('../models/users.model');
function  loginMiddleware(req, res, next) {
    userModel.getOneUser(req.body.email, req.body.clave);
    next();
}

module.exports = loginMiddleware;