const path = require('path');
const dataModel = require('../models/index.model');

const indexController = {
    getIndex: (req, res) => {
        let datos = dataModel.getData();
        return res.render(path.resolve(__dirname, '../views/index.ejs'), {datos});
    }
}

module.exports = indexController;