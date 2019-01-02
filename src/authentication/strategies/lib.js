const axios = require('axios');

module.exports.getData = async function getData(url, type, data) {
    if (!type) {
        type = 'GET';
    }
    return axios({
        url,
        method: type.toUpperCase(),
        json: true,
        data,
    });
};