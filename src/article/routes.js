'use strict';

const Router = require('koa-router');
const views = require('./views/views');

const router = new Router();

router.post('/storedata', views.storedata);
router.get('/article', views.read);
router.put('/editArticle', views.edit);
//router.post('/article', views.update);
//router.delete('/article', views.remove);

module.exports = router;