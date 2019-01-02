const { randomString } = require('../../../utils/randomization');

const key = randomString;
const errors = require('njs/lib/errors');
const Device = require('../models/device');

async function devices(request, user) {
    let result;
    const { ip, header } = request;
    result = await Device.findOne({ ip, userAgent: header['user-agent'], user: user._id });
    if (!result) {
        const device = new Device();
        device.ip = ip;
        device.userAgent = header['user-agent'];
        device.key = key;
        device.user = user;
        result = await device.save();
    }
    return result.key;
}

async function deviceFindOne(request, user) {
    const { ip, header } = request;
    const result = await Device.findOne({ ip, userAgent: header['user-agent'], user: user.user });
    if (!result) {
        throw new errors.InvalidData('Invalid session');
    }
    return result.key;
}

async function getUserDevices(user) {
    return Device.find({ user: user.user });
}

module.exports = {
    devices,
    deviceFindOne,
    getUserDevices,
};
