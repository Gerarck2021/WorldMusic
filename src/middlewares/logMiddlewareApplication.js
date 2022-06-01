const fs = require('fs');

const logMiddlewareApplication = (req, res, next) => {
    fs.writeFileSync('log.txt', 'esta ingresando a la ruta de ' + req.url);

    next();
}

module.exports = logMiddlewareApplication;