/**
 * @module Utils
 */

/**
 * Removes id/_id from provided object
 *
 * @param {object} obj Object to be sanitized
 *
 */
function removeIdFields(obj) {
    const data = Object.assign({}, obj);
    if (data.id) {
        delete data.id;
    }
    if (data._id) {
        delete data._id;
    }
    return data;
}

module.exports = {
    removeIdFields,
};
