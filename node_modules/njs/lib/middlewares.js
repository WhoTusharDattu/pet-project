let config;
const logger = require('koa-logger');
const parser = require('koa-better-body');
const serve = require('koa-static-cache');
const cors = require('kcors');

async function forceCanonicalHostname(ctx, next) {
    const canonicalHostname = config.canonicalHostname;
    if (ctx.host !== canonicalHostname) {
        const url = `http://${canonicalHostname}${ctx.path}`;
        ctx.status = 301;
        ctx.redirect(url);
    }
    await next;
}


module.exports = function defaultMiddlewares(c) {
    const middlewares = [];
    config = c;

    if (config.cors && config.cors.enabled) {
        middlewares.push(cors(config.cors));
    }

    if (config.forceCanonicalHostname) {
        middlewares.push(forceCanonicalHostname);
    }

    if (config.static) {
        const dir = config.static.directory || '';
        middlewares.push(serve(dir, config.static.options));
    }

    const parserConfig = { multipart: true, strict: false };
    Object.assign(parserConfig, config.parser || {});
    middlewares.push(parser(parserConfig));

    if (config.debug) {
        middlewares.push(logger());
    }

    return middlewares;
};