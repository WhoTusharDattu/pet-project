const Reports = require('../models/reports.modal');
async function read(ctx) {
    const result = Reports.findOne({ user: ctx.request.user.id });
    return result;
}

/**
 *This function will update theme and background image
 * @param {object} ctx - the context object of koa
 */
async function update(ctx) {
    var id = ctx.request.user.id;
    const result = await Reports.update({ user: id }, ctx.request.fields, { upsert: true });
    const resonse = await getBackground(id);
    return resonse;
}

/**
 *This function will update theme and background image
 * @param {string} data - data is user id
 */
async function getBackground(data) {
    const getdata = await Reports.findOne({ user: data });
    return getdata;
}

// remove background image
async function remove(ctx) {
    var id = ctx.request.user.id;
    const result = await Reports.update({ user: id }, { backgroundImage: '' }, { upsert: true });
    const resonse = await getBackground(id);
    return resonse;
}

module.exports = {
    read,
    update,
    remove
};