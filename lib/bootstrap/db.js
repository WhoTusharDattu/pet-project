const plugins = require('mongoose-plugins');
const mongoose = require('mongoose');
const url = require('url');

const config = require('../../config/index');

mongoose.Promise = Promise;

function makeMongoUrl() {
    const dbSettings = config.mongoDb;
    if (!dbSettings) {
        return false;
    }

    if (dbSettings.url) {
        return dbSettings.url;
    }

    const urlObj = {
        hostname: dbSettings.host,
        port: dbSettings.port,
        pathname: `/${dbSettings.db}`,
        query: dbSettings.options,
        protocol: 'mongodb',
        slashes: true,
    };
    if (dbSettings.username) {
        urlObj.auth = `${dbSettings.username}:${dbSettings.password || ''}`;
    }
    return url.format(urlObj);
}

function connectMongoDb() {
    mongoose.plugin(plugins.transformer);
    mongoose
        .connect(makeMongoUrl())
        .then(() => {
            global.Logger.debug('Mongoose Connected');
        })
        .catch((e) => {
            global.Logger.error(e);
            process.exit(0);
        });
}

connectMongoDb();
