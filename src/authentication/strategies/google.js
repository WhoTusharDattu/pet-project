const errors = require('njs/lib/errors');

const config = require('../../../config/base');
const lib = require('./lib');


function parseData(data) {
    const parsedData = {
        socialIds: {
            google: data.id,
        },
        name: `${data.first_name} ${data.last_name}`,
        profileImageURL: data.picture,
        email: data.email,
        mobile: '',
    };
    return parsedData;
}

async function tokenVerfication(data) {
    const GOOGLE_TOKEN_DEBUG = `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${data.accessToken}`;
    const debug = await lib.getData(GOOGLE_TOKEN_DEBUG);
    const { aud, expires_in } = debug.data.data;
    if (aud !== config.google.app_id || expires_in < 0) {
        throw new errors.InvalidData('Invalid Token');
    }
    return true;
}


async function signIn(params) {
    const verification = await tokenVerfication(params);
    if (verification) {
        const GOOGLE_URL = `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${params.accessToken}`;
        const response = await lib.getData(GOOGLE_URL);
        const { data } = response;
        if (data.error) {
            throw new errors.InvalidData('Invalid Token');
        }
        return parseData(data);
    }
}

module.exports = signIn;