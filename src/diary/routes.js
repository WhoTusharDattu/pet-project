'use strict';

const Router = require('koa-router');
const views = require('./views/views');

const router = new Router();

router.post('/writePage', views.writePage);
router.get('/readPage', views.readPage);
router.put('/editPage', views.editPage);
router.get('/readAll', views.readAll);


module.exports = router;