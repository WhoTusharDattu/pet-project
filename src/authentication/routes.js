const Router = require('koa-router');
const views = require('./views');
const middleware = require('./middleware');

const router = new Router();

router.put('/edit', views.edit);

router.post('/login', views.logIn);

router.post('/signUp', views.signUp);

router.post('/mobile', views.mobileSignin);

router.post('/remove', views.remove);

// get users devices
router.post('/devices', middleware.checkAuth, views.getUserDevices);

module.exports = router;
