const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReportsSchema = new Schema({
    name: {
        type: String,
        default: 'reports'
    },
    theme: {
        type: String,
        default: 'defaultish'
    },
    backgroundImage: {
        type: String,
        default: ''
    },
    user: {
        type: String,
    },
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'modified',
    },
});
const Reports = mongoose.model('Reports', ReportsSchema);

module.exports = Reports;