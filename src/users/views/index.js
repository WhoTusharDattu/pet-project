const userViews = require('./user');
const operations = require('../operations');
const { isAuthenticated } = require('../../../utils/access');

const { formatProfileResponse } = require('../../../utils/sanitization');

async function myProfile(ctx) {
    // console.log('my-profile', ctx.header);
    // console.log('userId', ctx.state.user.id); // undefined
    console.log('VIEW',ctx.session);
    isAuthenticated(ctx);
    console.log('myProfile ctx', ctx.state);

    console.log('userId', ctx.state); // undefined
    if (!ctx.state.user) {
        return;
    }
    console.log('userId', ctx.state.user);

    const { id } = ctx.state.user;

    const user = await operations.findById(id, {}, '');

    console.log('user result', user);
    const response = formatProfileResponse(user);
    console.log('response', response);

    // if (user.admin) {
    //     response.admin = true;
    // }

    ctx.successJson(response);
}


module.exports = {
    userViews,
    myProfile,
};
