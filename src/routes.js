const Router = require('koa-router');

const router = new Router();

const authenticationRoutes = require('./authentication/routes');
const userRoutes = require('./users/routes');
const articleRoutes = require('./article/routes');
const diaryRoutes = require('./diary/routes');

router.use(...[
    '',
    authenticationRoutes.routes(),
    userRoutes.routes(),
    articleRoutes.routes(),
    diaryRoutes.routes()
]);

module.exports = router;