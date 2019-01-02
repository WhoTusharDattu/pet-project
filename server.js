const bootstrap = require('./lib/bootstrap');
const config = require('./config');

const { port } = config;

const app = bootstrap(config);

app.listen(port);

global.Logger.info('App running on port', port);

module.exports = app;
