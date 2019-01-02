const sgMail = require('@sendgrid/mail');
const config = require('../../config/index');

const SENDGRID_API_KEY = config.sendGrid.key;
sgMail.setApiKey(SENDGRID_API_KEY);

async function sendEmail(data) {
    try {
        const msg = {
            from: {
                name: data.from.name,
                email: data.from.email,
            },
            to: [{ name: data.to[0].name, email: data.to[0].email }],
            text: data.text,
            subject: data.subject,
            attachment: data.attachment || [{}],
            cc: data.cc,
            bcc: data.bcc,
        };

        const result = await sgMail.send(msg);
        return {
            statusCode: result[0].toJSON().statusCode,
            messageId: result[0].toJSON().headers['x-message-id'],
            success: true,
        };
    } catch (e) {
        return {
            code: e.code,
            message: e.message,
            success: false,
        };
    }
}

module.exports = {
    sendEmail,
};
