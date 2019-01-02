const jwt = require('jsonwebtoken');

const errors = require('njs/lib/errors');
const devices = require('./operations/devices');


/**
 *
 *
 * @param {object} ctx - context object
 * @param {object} next - go to next route
 */
async function checkAuth(ctx, next) {
    const { token } = ctx.request.query;
    if (!token) {
        throw new errors.InvalidData('Jwt token is required!');
    }
    try {
        const user = jwt.decode(token);
        const key = await devices.deviceFindOne(ctx.request, user);
        ctx.request.user = jwt.verify(token, key);
        await next();
    } catch (e) {
        throw new errors.InvalidData('Invalid Token!');
    }
}

module.exports = {
    checkAuth,
};
