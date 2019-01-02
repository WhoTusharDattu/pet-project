/**
 * dependencies
 */
var acl = require('acl');
const errors = require('njs/lib/errors');
const jwt = require('jsonwebtoken');

const aclCheck = require('../../../utils/acl');

acl = new acl(new acl.memoryBackend());

/**
 * Check If Reports Policy Allows
 */
exports.isAllowed = async(ctx, next) => {
    await acl.allow([{
        roles: ['user'],
        allows: [{
                resources: '/api/reports',
                permissions: ['get', 'post', 'delete']
            },
            {
                resources: '/api/tracks/:tracksId',
                permissions: ['put', 'post']
            }
        ]
    }]);
    await aclCheck.check(acl, ctx, next);
};