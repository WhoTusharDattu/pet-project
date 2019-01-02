const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phones: {
        type: [{
            type: String,
            trim: true,
            lowercase: true,
            // @TODO: Maybe a phone number validator?
        }],
    },
    password: {
        type: String,
        trim: true,
        default: '',
    },
    profileImage: {
        type: String,
        trim: true,
        default: '',
    },
    socialIds: {
        type: {
            facebook: {
                type: String,
                trim: true,
            },
            google: {
                type: String,
                trim: true,
            },
            linkedIn: {
                type: String,
                trim: true,
            },
            instagram: {
                type: String,
                trim: true,
            },
            twitter: {
                type: String,
                trim: true,
            },
        },
        default: {},
    },
    active: {
        type: Boolean,
        default: false,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false,
        required: true,
    },
}, {
    hide: 'password',
    timestamps: {
        createdAt: 'created',
        updatedAt: 'modified',
    },
});

UserSchema.methods.comparePassword = function comparePassword(pass) {
    return bcrypt.compareSync(pass, this.password);
};

// @TODO: virtual for full URL of profileImage (Consider profileImage being urls from facebook, google)
// @TODO: virtual for full URL of facebook profile (undefined if not linked)
// @TODO: virtual for full URL of linkedIn profile (undefined if not linked)
// @TODO: virtual for full URL of twitter profile (undefined if not linked)
// @TODO: virtual for full URL of instagram profile (undefined if not linked)

UserSchema.pre('save', function hashPassword(next) {
    if (this.isModified('password') || this.isNew) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    return next();
});

module.exports = mongoose.model('User', UserSchema);
