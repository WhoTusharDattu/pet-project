const Twilio = require('twilio');
const config = require('../../config/index');
const moment = require('moment-timezone');

async function createAccount(name) {
    const service = new Twilio(config.twilio.sid, config.twilio.authToken);
    const account = await service.api.accounts.create({ friendlyName: name });
    const data = {
        sid: account.sid,
        authToken: account.authToken,
    };
    return data;
}

async function countSMS(restaurant, month) {
    const service = new Twilio(restaurant.twilio.sid, restaurant.twilio.authToken);
    const monthDate = moment.tz(undefined, restaurant.timezone);
    if (month) {
        monthDate.month(month);
    }
    const filters = {
        category: 'sms',
        startDate: moment(monthDate).startOf('month').format('YYYY-MM-DD'),
        endDate: moment(monthDate).endOf('month').format('YYYY-MM-DD'),
    };

    return new Promise(resolve => service.usage.records.each(filters, record => resolve(record.count)));
}

async function sendSMS(restaurant, { from, to, body }) {
    const service = new Twilio(restaurant.twilio.sid, restaurant.twilio.authToken);
    return service.messages.create({ body, to, from });
}

module.exports = {
    createAccount,
    sendSMS,
    countSMS,
};
