const operations = require('../operations/operations');

/**
 *This function will read theme and background image
 * @param {object} ctx - the context object of koa
 */
async function read(ctx) {
    const result = await operations.read(ctx);
    ctx.successJson(result);
}

/**
 *This function will update theme and background image
 * @param {object} ctx - the context object of koa
 */
async function update(ctx) {
    const result = await operations.update(ctx);
    ctx.successJson(result);
}

/**
 *This function will remove background image
 * @param {object} ctx - the context object of koa
 */
async function remove(ctx) {
    const result = await operations.remove(ctx);
    ctx.successJson(result);
}

module.exports = {
    read,
    update,
    remove
}