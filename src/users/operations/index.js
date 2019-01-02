const { User } = require('../models');
const errors = require('njs/lib/errors');
const { removeIdFields } = require('../../../utils/sanitization');

/**
 * This function will find a user or specific data according to conditions
 *
 * @param {object} conditions - conditions is optional for finding specific data
 * @returns user - single user
 */
async function findOne(conditions) {
    const user = await User.findOne(conditions).populate({
        path: 'outlet',
        select: 'name',
    }).exec();
    if (!user) {
        throw new errors.NotFound('User not found');
    }
    return user;
}

/**
 *This function will find user by Id or by conditions
 *
 * @param {string} id - unique user id
 * @param {object} [conditions={}] - conditions is optional for finding specific data
 * @returns findOne()
 */
async function findById(id, conditions = {}) {
    const finalConditions = Object.assign(conditions, { _id: id });
    return findOne(finalConditions);
}


/**
 * This function will find user by conditions, sorts or fields
 *
 * @param {object} [conditions={}] - conditions is optional for finding specific data
 * @param {string} [sort=''] - sort is optional for finding sorted data
 * @param {string} [fields=''] - fields is optional for finding data of particular field
 * @returns success data
 */
async function list(query = {}, sort = '', fields = '') {
    return User.find(query).populate([{
        path: 'city',
        select: 'name',
    },
    {
        path: 'serviceArea',
        select: 'name',
    },
    {
        path: 'outlet',
        select: 'name',
    }]).select(fields)
        .sort(sort)
        .exec();
}


/**
 *This function will update the particular user
 *
 * @param {string} id
 * @param {object} payload - data for update
 * @returns user
 */
async function update(id, payload) {
    const data = Object.assign({}, removeIdFields(payload));
    const user = await User.findByIdAndUpdate(id, { $set: data }, { new: true }).exec();

    if (!user) {
        throw new errors.NotFound('User not found');
    }

    return user;
}


/**
 * This function will call update method to mark as deleted  the user
 *
 * @param {string} id
 * @returns update()
 */
async function markDeleted(id) {
    return update(id, { deleted: true });
}

/**
 * This function will remove the user permanently
 *
 * @param {string} id
 * @returns user - success data
 */
async function remove(id) {
    const user = await User.findByIdAndRemove(id).exec();
    if (!user) {
        throw new errors.NotFound('User does not exist');
    }
    return user;
}


module.exports = {
    findOne,
    findById,
    list,
    markDeleted,
    remove,
    update,
};
