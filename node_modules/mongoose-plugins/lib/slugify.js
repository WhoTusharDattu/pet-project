const _ = require('lodash');

function slugify(schema, options = {}) {
    // Options
    const target = options.target || 'slug';
    const source = options.source || 'title';
    const maxLength = options.maxLength || 128;
    const spaceChar = options.spaceChar || '-';
    const invalidChar = options.invalidChar || '';
    const override = options.override || false;
    const unique = options.unique || false;
    const prefix = options.prefix || '';
    const fields = {};

    // Add paths to schema if not present
    if (!schema.paths[target]) {
        fields[target] = {
            type: String,
            sparse: true,
            unique,
        };
    }
    schema.add(fields);

    ['static', 'method'].forEach((method) => {
        schema[method]('slugify', (str) => {
            if (!str) {
                return null;
            }
            str = str
                .trim()
                .toLowerCase();

            // Convert all accent characters
            str = _.deburr(str);

            // Replace all invalid characters and spaces, truncating to the max length
            return str
                .replace(/[^a-z0-9 -]/g, invalidChar)
                .replace(new RegExp(`[${invalidChar}]+`, 'g'), invalidChar)
                .replace(/\s+/g, spaceChar)
                .substr(0, maxLength);
        });
    });

    // Extract the slug on save, optionally overriding a previous value
    schema.pre('save', function preSave(next) {
        if (!this[target] || override) {
            const input = _.get(this, source);
            this[target] = prefix + this.slugify(input);
        }
        next();
    });
}

module.exports = slugify;