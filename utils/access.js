const errors = require('njs/lib/errors');

function checkPermission(ctx, permission = '') {
    // @TODO: Permission Check Functionality
    return true;
}

function isUnauthenticated(ctx) {
    return !(ctx.state.authenticated || ctx.state.user);
}

function isAuthenticated(ctx) {
    if (isUnauthenticated(ctx)) {
        throw new errors.UnauthorizedAccess('Not logged in');
    }
    return true;
}

function isAdmin(ctx) {
    isAuthenticated(ctx);
    const { permission } = ctx.state;
    if (!permission.admin) {
        throw new errors.NotAllowed('You are not allowed');
    }

    return true;
}

module.exports = {
    isAuthenticated,
    isUnauthenticated,
    isAdmin,
    checkPermission,
};
