const mongoose = require('mongoose');

const { Schema } = mongoose;

const DeviceSchema = new Schema({
    ip: {
        type: String,
        required: 'ip is required',
    },
    userAgent: {
        type: String,
    },
    key: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.ObjectId,
        refer: 'user',
    },
});

module.exports = mongoose.model('Device', DeviceSchema);