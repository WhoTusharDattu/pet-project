const path = require('path');
const uuid = require('uuid/v4');
const humanize = require('humanize-number');
const Counter = require('passthrough-counter');
const winston = require('winston');

let Logger;

function consoleTransport() {
    return new winston.transports.Console({
        handleExceptions: true,
        level: 'silly',
        prettyPrint: true,
        colorize: true,
        timestamp: false,
    });
}

function fileTransport(filePath) {
    return new winston.transports.File({
        handleExceptions: true,
        json: true,
        filename: filePath,
        level: 'silly',
    });
}

function delta(start) {
    const difference = new Date() - start;
    const string = difference < 10000 ? `${difference}ms` : `${Math.round(difference / 1000)}s`;
    return humanize(string);
}

function logRequest(id, start, ctx) {
    const log = {
        id,
        type: 'request',
        method: ctx.method,
        path: ctx.path,
        query: ctx.query,
        ip: ctx.ip,
    };
    Logger.info(log);
}

function logError(id, start, ctx, error) {
    const log = {
        id,
        type: 'error',
        method: ctx.method,
        path: ctx.path,
        query: ctx.query,
        ip: ctx.ip,
        time: delta(start),
        error,
        stack: error.stack,
    };
    Logger.error(log);
}

function logResponse(id, start, ctx, length) {
    const log = {
        id,
        type: 'response',
        status: ctx.status || 404,
        method: ctx.method,
        path: ctx.path,
        query: ctx.query,
        ip: ctx.ip,
        time: delta(start),
        length,
    };
    Logger.info(log);
}

async function middleware(ctx, next) {
    const start = new Date();
    const id = uuid();

    logRequest(id, start, ctx);

    try {
        await next();
    } catch (error) {
        logError(id, start, ctx, error);
    }

    const length = ctx.response.length;
    const body = ctx.body;
    let counter;
    if (length === null && body && body.readable) {
        ctx.body = body
            .pipe(counter = Counter())
            .on('error', ctx.onerror);
    }

    function done() {
        ctx.res.removeListener('finish', done);
        ctx.res.removeListener('close', done);

        logResponse(id, start, ctx, counter ? counter.length : length);
    }

    ctx.res.once('finish', done);
    ctx.res.once('close', done);
}

function configure(config = { debug: true }) {
    const options = {
        transports: [],
        exitOnError: false,
    };

    if (config.debug) {
        options.transports.push(consoleTransport());
    }

    const filePath = config.logs && config.logs.path ?
        config.logs.path :
        path.resolve(process.cwd(), 'logs/nascence.log');
    options.transports.push(fileTransport(filePath));


    Logger = new winston.Logger(options);
    global.Logger = Object.freeze(Logger);

    return {
        Logger,
        middleware,
    };
}


module.exports = configure;