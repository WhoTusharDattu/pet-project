const slugify = require('./lib/slugify');
const timestamps = require('./lib/timestamps');
const paginate = require('./lib/paginate');
const transformer = require('./lib/transformer');

module.exports = {
    paginate,
    slugify,
    timestamps,
    transformer,
};