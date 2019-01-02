'use strict';
/**
 * Module dependencies
 */

const Router = require('koa-router');
const views = require('./views/views');
const tracksPolicy = require('./policies/tracks.server.policy');

const router = new Router();

router.get('/api/reports', tracksPolicy.isAllowed, views.read);
router.post('/api/reports', tracksPolicy.isAllowed, views.update);
router.delete('/api/reports', tracksPolicy.isAllowed, views.remove);

module.exports = router;