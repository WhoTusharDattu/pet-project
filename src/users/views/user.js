const operations = require('../operations');
const validator = require('validator');
const errors = require('njs/lib/errors');
const { isAuthenticated } = require('../../../utils/access');


/**
 *This function will call the operation to list the users
 *
 * @param {object} ctx - context object
 *
 */
async function list(ctx) {
    // isAuthenticated(ctx);
    const options = ctx.request.query;
    const query = options.q ? JSON.parse(options.q) : {};
    const sort = options.sort ? options.sort : 'name';
    const fields = options.fields ? options.fields : '';

    const result = await operations.list(query, sort, fields);
    ctx.successJson(result);
}

/**
 *This function will call the operation to find the user by id
 *
 * @param {object} ctx the context object of koa
 */
async function get(ctx) {
    const { id } = ctx.params;
    const result = await operations.findById(id);
    ctx.successJson(result);
}

/**
 *This function will remove the user or marked as deleted
 * @param {object} ctx - the context object of koa
 * @member {object} data - if data.permanent is true than remove() operation will call else markDeleted()
 */
async function remove(ctx) {
    const { id } = ctx.params;
    const data = ctx.request.fields || {};
    let result;

    if (data.permanent) {
        result = await operations.remove(id);
    } else {
        result = await operations.markDeleted(id);
    }


    ctx.successJson(result);
}


module.exports = {
    list,
    get,
    remove,
};
