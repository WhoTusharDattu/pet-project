const mongoose = require('mongoose');
const validator = require('validator');
const Notification = require('./notification');

const { Schema } = mongoose;

const EmailSchema = new Schema({
    to: {
        type: [{
            name: {
                type: String,
                trim: true,
            },
            email: {
                type: String,
                trim: true,
                required: true,
                match: [validator.isEmail, 'Please fill a valid email address'],
            },
        }],
    },
    from: {
        type: {
            email: {
                type: String,
                trim: true,
                required: true,
                match: [validator.isEmail, 'Please fill a valid email address'],
            },
            name: {
                type: String,
                trim: true,
            },
        },
        required: true,
        default: { name: 'SUPERB', email: 'no-reply@superb.community' },
    },
    cc: {
        type: [{
            email: {
                type: String,
                trim: true,
                required: true,
                match: [validator.isEmail, 'Please fill a valid email address'],
            },
            name: {
                type: String,
                trim: true,
            },
        }],
        trim: true,
    },
    bcc: {
        type: [{
            email: {
                type: String,
                trim: true,
                required: true,
                match: [validator.isEmail, 'Please fill a valid email address'],
            },
            name: {
                type: String,
                trim: true,
            },
        }],
    },
    replyTo: {
        type: {
            email: {
                type: String,
                trim: true,
                required: true,
                match: [validator.isEmail, 'Please fill a valid email address'],
            },
            name: {
                type: String,
                trim: true,
            },
        },
    },
    subject: {
        type: String,
        trim: true,
        required: true,
    },
    html: {
        type: String,
        trim: true,
        required: true,
    },
    text: {
        type: String,
        trim: true,
    },
    attachments: {
        type: [{
            type: {
                type: String,
                trim: true,
            },
            name: {
                type: String,
                trim: true,
            },
            content: {
                type: String,
                trim: true,
            },
        }],
    },
    response: {
        type: {
            messageId: {
                type: String,
                trim: true,
                default: '',
            },
            statusCode: {
                type: Number,
                default: '',
            },
        },
    },
});

const Email = Notification.discriminator('Email', EmailSchema);
module.exports = Email;
