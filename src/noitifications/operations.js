const { Email, SMS, Notification } = require('./models');
const GenericOperations = require('../../lib/operations/Generic');

class Operations extends GenericOperations {
    constructor(name, model) {
        super(name, model);
        this.sms = this.sms.bind(this);
        this.email = this.email.bind(this);
    }

    static async sms(data) {
        const result = new SMS(data);
        return result.save();
    }

    static async email(data) {
        const result = new Email(data);
        return result.save();
    }

    async create(type, data) {
        if (['sms', 'email'].indexOf(type) === -1) {
            throw new Error('Not Supported');
        }
        return this[type](data);
    }
}

const operations = new Operations('Notification', Notification);

module.exports = {
    operations,
};
