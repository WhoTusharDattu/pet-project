// const errors = require('njs/lib/errors');
// const _ = require('lodash');
const responses = require('../../../utils/responses');

function parseError(e) {
    // @TODO: Handle/Parse MongoDB Errors here
    return e;
}

async function errorHandler(ctx, next) {
    try {
        await next();
    } catch (e) {
        const err = parseError(e);
        responses.errorJson(ctx, err);
        global.Logger.error(err);
    }
}

async function middlewares(ctx, next) {
    ctx.successJson = data => responses.successJson(ctx, data);

    await errorHandler(ctx, next);
}

module.exports = middlewares;
