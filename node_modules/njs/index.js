const _ = require('lodash');
const Koa = require('koa');
const sessions = require('koa-generic-session');
const MongoStore = require('koa-generic-session-mongo');

const Middlewares = require('./lib/middlewares');
const Logging = require('./lib/logger');

class Nascence {
    constructor(config) {
        if (config) {
            this.init(config);
        }
    }

    init(config) {
        this.config = config;
        this.app = new Koa();
        this.app.keys = config.keys;

        this.mountLogger();

        this.mountSession();

        this.loadFrameworkMiddlewares();
    }

    mountLogger() {
        const { Logger, middleware } = Logging(this.config);
        this.app.use(middleware);
        this.logger = Logger;

        if (this.config.debug) {
            this.logger.debug('Loaded Middleware: Logger');
        }
    }

    getSessionStore() {
        const settings = this.config.sessions.store;
        return new MongoStore(settings);
    }

    mountSession() {
        if (!this.config.sessions || this.config.sessions.disabled) {
            return;
        }

        const config = this.config.sessions;
        const sessionStore = this.getSessionStore();
        const sessionConfig = _.assign(config, { store: sessionStore });

        this.app.use(sessions(sessionConfig));
    }

    loadFrameworkMiddlewares() {
        const middlewares = Middlewares(this.config);

        middlewares.forEach((middleware) => {
            if (this.config.debug) {
                this.logger.debug(`Loaded middleware:${middleware.name}`);
            }
            this.app.use(middleware);
        });
    }
}

module.exports = new Nascence();
