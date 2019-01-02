function plugin(schema, options = {}) {
    const defaultLimit = options.defaultLimit || 10;

    schema.static('paginate', function paginatePlugin(opts) {
        const query = opts.conditions || {};
        const page = parseInt(opts.page, 10) || 1;
        const limit = parseInt(opts.limit, 10) || defaultLimit;
        const fields = opts.fields || {};
        const sort = opts.sort || '';
        const populate = opts.populate || '';

        const docsQuery = this.find(query, fields, {
            skip: (page && (page !== -1)) ? (limit * (page - 1)) : 0,
            limit: (page !== -1) ? limit : '',
        }).populate(populate).sort(sort).exec();

        const countQuery = this.count(query).exec();

        return async function paginate() {
            const results = await Promise.all([countQuery, docsQuery]);
            const count = results[0];
            return {
                count,
                pages: Math.ceil(count / limit),
                currentPage: page,
                docs: results[1],
            };
        };
    });
}

module.exports = plugin;