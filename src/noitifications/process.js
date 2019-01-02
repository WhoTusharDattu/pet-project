const { sendSMS } = require('../../lib/twilio');
const { sendEmail } = require('../../lib/sendgrid');
const { operations } = require('./operations');

const { SMS, Email } = require('./models');

async function sms({ _id }) {
    const data = await SMS.findById(_id);
    const result = await sendSMS(data);

    if (result.success === true) {
        await operations.update(_id, { status: 'done' }, { select: '', populate: '' });
        await SMS.findByIdAndUpdate(_id, { response: result });
    } else if (result.success === false) {
        await operations.update(_id, { status: 'failed', response: result }, { select: '', populate: '' });
        await SMS.findByIdAndUpdate(_id, { response: result });
    }
}

async function email({ _id }) {
    const data = await Email.findById(_id);

    const result = await sendEmail(data);
    if (result.success === true) {
        await operations.update(_id, { status: 'done' }, { select: '', populate: '' });
        await Email.findByIdAndUpdate(_id, { response: result });
    } else if (result.success === false) {
        await operations.update(_id, { status: 'failed' }, { select: '', populate: '' });
        await Email.findByIdAndUpdate(_id, { response: result });
    }
}

module.exports = {
    sms,
    email,
};
