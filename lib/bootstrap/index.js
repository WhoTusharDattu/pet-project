/* eslint-disable global-require */
const njs = require('njs');

module.exports = function bootstrap(config) {
    njs.init(config);
    require('./db');

    require('./middlewares');

    require('./routes');

    return njs.app;
};
