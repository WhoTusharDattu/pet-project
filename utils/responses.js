/**
 * @module Utils
 */

/**
 * This function will be used to send json as body of response to client
 *
 * @param {object} ctx - the context object of Koa
 * @param {object} payload Body of the response
 */
function json(ctx, payload) {
    ctx.set('Content-Type', 'application/json');
    ctx.body = payload;
}

/**
 * This function will be used to send success
 * response to the client
 *
 * @param {object} ctx - the context object of Koa
 * @param {object} data Body of the response
 * @param {number} [statusCode=200] HTTP Status code for response
 */
async function successJson(ctx, data, statusCode = 200) {
    ctx.status = parseInt(statusCode, 10);
    json(ctx, { success: true, data });
}

/**
 * This function will be used to send error
 * response to the client
 *
 * @param {object} ctx - the context object of Koa
 * @param {object} error object containing msg and code
 */
function errorJson(ctx, error) {
    const err = {
        code: error.code || 500,
        message: error.message || error.msg,
    };
    ctx.status = parseInt(err.code, 10);
    json(ctx, { success: false, error: err });
}

module.exports = {
    successJson,
    errorJson,
};
