const Router = require('koa-router');
const views = require('./views');
const user = require('./views/user');

const router = new Router();

router.prefix('/users');

router.get('/', user.list);
router.get('/my-profile', views.myProfile);
router.get('/:id', user.get);

router.delete('/:id', user.remove);

module.exports = router;
