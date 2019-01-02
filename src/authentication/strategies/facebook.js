const errors = require('njs/lib/errors');

const config = require('../../../config/base');
const lib = require('./lib');

function parseData(data) {
    return {
        socialIds: {
            facebook: data.id,
        },
        name: `${data.first_name} ${data.last_name}`,
        profileImageURL: `https://graph.facebook.com/v2.5/${data.id}/picture?height=200`,
        email: data.email,
        mobile: '',
    };
}

async function tokenVerfication(data) {
    const FACEBOOK_TOKEN_DEBUG = `https://graph.facebook.com/v2.5/debug_token?input_token=${data.accessToken}&access_token=${data.accessToken}`;
    const debug = await lib.getData(FACEBOOK_TOKEN_DEBUG);
    const { app_id, is_valid } = debug.data.data;
    if (app_id !== config.facebook.app_id || !is_valid) {
        throw new errors.InvalidData('Invalid Token');
    }
    return true;
}

async function signIn(params) {
    const verification = await tokenVerfication(params);
    if (verification) {
        const FACEBOOK_GRAPH_URL = `https://graph.facebook.com/v2.5/me?access_token=${params.accessToken}&fields=email,first_name,last_name,picture`;
        const response = await lib.getData(FACEBOOK_GRAPH_URL);
        const { data } = response;
        if (data.error) {
            throw new errors.InvalidData('Invalid Token');
        }
        return parseData(data);
    }
}

module.exports = signIn;