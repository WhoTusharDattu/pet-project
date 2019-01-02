/**
 * @module Utils
 */

const crypto = require('crypto');
const chance = require('chance').Chance();

/**
 * Generates a random string of defined length and charset
 *
 * @param {number} [length] Length of the string
 * @param {string} [charset] Character Pool to choose from
 * @return {string} Random string
 */
function randomString(length, charset) {
    const options = {};

    if (length) {
        options.length = length;
    }

    if (charset) {
        options.pool = charset;
    }

    return chance.string(options);
}

/**
 * Generates md5 hash of the given string, or a random string
 *
 * @param {string} [string] String whose md5 is required
 * @return {string} MD5 Hash
 */
function md5Hash(string) {
    const md5Sum = crypto.createHash('md5');
    const target = string || randomString();

    md5Sum.update(target);

    return md5Sum.digest('hex');
}

module.exports = {
    md5Hash,
    randomString,
};
