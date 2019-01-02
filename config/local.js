process.env.NODE_ENV = 'development';

const _ = require('lodash');

const baseSettings = require('./base');

const settings = {
    debug: true,
    port: 3010,
    database: {
        host: 'localhost',
        port: 27017,
        db: 'boilerplate',
    },
    sessions: {
        store: {
            host: 'localhost',
            port: 27017,
            db: 'boilerplate',
            collection: 'sessions',
        },
    },
};

module.exports = _.merge(baseSettings, settings);



