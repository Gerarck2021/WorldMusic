const path = require('path');

const usersController = {
    getLogin: (req, res) => {
        return res.sendFile(path.resolve(__dirname, '../views/iniciar-sesion.html'));
    },

    getRegister: (req, res) => {
        return res.sendFile(path.resolve(__dirname, '../views/registro.html'));
    }
}

module.exports = usersController;