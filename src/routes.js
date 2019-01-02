const Router = require('koa-router');

const router = new Router();

const authenticationRoutes = require('./authentication/routes');
const userRoutes = require('./users/routes');
const articleRoutes = require('./article/routes');

router.use(...[
    '',
    authenticationRoutes.routes(),
    userRoutes.routes(),
    articleRoutes.routes()
]);

module.exports = router;
