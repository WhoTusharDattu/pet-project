const mongoose = require('mongoose');

const { Schema } = mongoose;

const NotificationSchema = new Schema({
    status: {
        type: String,
        enum: ['done', 'pending', 'failed'],
        default: 'pending',
    },
    metaData: {
        type: Schema.Types.Mixed,
    },
    processAt: {
        type: Date,
        default: Date.now,
    },
}, {
    discriminatorKey: 'type',
    timestamps: {
        createdAt: 'created',
        updatedAt: 'modified',
    },
});
const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
