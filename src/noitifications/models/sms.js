const mongoose = require('mongoose');
const Notification = require('./notification');

const { Schema } = mongoose;

const SMSSchema = new Schema({
    from: {
        type: String,
        trim: true,
    },
    body: {
        type: String,
        trim: true,
    },
    to: {
        type: String,
        trim: true,
    },
    response: {
        type: {
            uri: {
                type: String,
                trim: true,
            },
            status: {
                type: String,
                trim: true,
            },
            sid: {
                type: String,
                trim: true,
            },
        },
    },
});

const SMS = Notification.discriminator('SMS', SMSSchema);

module.exports = SMS;
