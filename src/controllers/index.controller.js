const path = require('path');

const indexController = {
    getIndex: (req, res) => {
        return res.sendFile(path.resolve(__dirname, '../views/index.html'));
    }
}

module.exports = indexController;