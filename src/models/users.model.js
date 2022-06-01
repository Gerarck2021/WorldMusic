const dataUsuarios = require('./data/bd-users.json');
const fs = require('fs');
const path = require('path');
const { exit } = require('process');
const usersModel = {
    getUsers: () => {
        return dataUsuarios;
    },

    isExist: (id) => {
        const isExist = usersModel.getUsers().find((item) => item.id == id);
        if (isExist) {
            return true;
        } else {
            return false;
        }
    },

    afterLogin: (email, clave) => {
        let data = usersModel.getUsers();
        let userData = data.filter(usuario => usuario.email == email && usuario.clave == clave)[0];
        return userData;
    },

    createUser: (user) => {
        try {
            const users = usersModel.getUsers();
            if (usersModel.isExist(users.id)) {
            return "Ya existe";
            }
            users.push(user);
            fs.writeFileSync(
            path.resolve(__dirname, "./data/bd-users.json"),
            JSON.stringify(users, null, 4),
            { encoding: "utf8" }
            );
            return "Creado";
        } catch(e) {
            console.log(e);
        }
      },

      UserUpdate:(id, user) => {
        const indiceBuscado = usersModel.getUsers().findIndex(
            (user) => user.id == id
          );
          if (indiceBuscado < 0 || indiceBuscado > usersModel.getUsers().length) {
            return "No existe este usuario en la base de datos";
          }
          let newDb = usersModel.getUsers();
          newDb[indiceBuscado].id = id;
          newDb[indiceBuscado] = user;
          fs.writeFileSync(
            path.resolve(__dirname, "./data/bd-users.json"),
            JSON.stringify(newDb, null, 4),
            { encoding: "utf8" }
        );
      },

      UserDelete: (id) => {
        let userDelete = usersModel.getUsers().filter(item => item.id != id);
        fs.writeFileSync(path.resolve(__dirname, './data/bd-users.json'), JSON.stringify(userDelete, null, 4), {encoding: 'utf8'});
      },

      getOneUser: (email, clave) => {
        dataUsuarios.forEach(usuario => {
            if(usuario.email == email && usuario.clave == clave) {
                console.log("Ingreso exitoso");
            } 
        });
      }
}

module.exports = usersModel;