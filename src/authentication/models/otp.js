const mongoose = require('mongoose');
const phone = require('phone');

const { Schema } = mongoose;

/**
 * A Validation function for phone number
 */

const validateMobile = (mobile) => {
    return (phone(mobile).length > 0);
    };

const OTPSchema = new Schema({
    otp: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        // validate: [validateMobile, 'Please enter a valid mobile number'],
        required: true,
        lowercase: true,
        trim: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    expiresIn: {
        type: Date,
    },
});

module.exports = mongoose.model('Otp', OTPSchema);
