const errors = require('njs/lib/errors');

const superagent = require('superagent');
const config = require('config').linkedIn;

const BASE_URL = 'https://api.linkedin.com';

const PROFILE_URL = '/v1/people/';

function parseData(data) {
    return {
        socialIds: {
            linkedIn: data.memberId,
        },
        name: `${data.first_name} ${data.last_name}`,
        email: data.email,
        mobile: '',
    };
}

async function signIn(data) {
    return parseData(data);
}

module.exports = signIn;