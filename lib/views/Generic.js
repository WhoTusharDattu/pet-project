const { checkPermission } = require('../../utils/access');

/**
 * @class GenericViews
 */
class GenericViews {
    /**
     * Create a Views object with generic view functions
     *
     * @param {object} operations Operations pertaining to the model
     * @param {object} [options={}] Options
     * @param {string|function|object} [options.permissionCheck] Permissions configuration
     *
     */
    constructor(operations, { permissionCheck } = {}) {
        this.operations = operations;
        this.permissionCheck = permissionCheck;

        this.list = this.list.bind(this);
        this.post = this.post.bind(this);
        this.get = this.get.bind(this);
        this.patch = this.patch.bind(this);
        this.delete = this.delete.bind(this);
    }

    checkPermissions(ctx, key) {
        let fn = this.permissionCheck;
        let fnType = typeof fn;

        if (!fn) {
            return true;
        }

        if (fnType === 'string') {
            return checkPermission(ctx, fn);
        }

        if (fnType === 'function') {
            return fn(ctx);
        }

        if (fnType === 'object') {
            fn = fn[key];
            fnType = typeof fn;

            if (!fn) {
                return true;
            }

            if (fnType === 'string') {
                return checkPermission(ctx, fn);
            }

            if (fnType === 'function') {
                return fn(ctx);
            }
        }

        throw new Error('Invalid permissions configuration for views');
    }

    async list(ctx) {
        this.checkPermissions(ctx, 'list');

        const options = ctx.request.query;

        const query = options.q ? JSON.parse(options.q) : {};
        const select = options.select ? options.select : '';
        const populate = options.populate ? options.populate : '';

        const result = await this.operations.list(query, { select, populate });

        ctx.successJson(result);
    }

    async post(ctx) {
        this.checkPermissions(ctx, 'post');

        const data = ctx.request.fields;
        const options = ctx.request.query;
        const populate = options.populate ? options.populate : '';

        const result = await this.operations.create(data, { populate });
        ctx.successJson(result);
    }

    async get(ctx) {
        this.checkPermissions(ctx, 'get');

        const { id } = ctx.params;
        const options = ctx.request.query;
        const query = options.q ? JSON.parse(options.q) : {};
        const select = options.select ? options.select : '';
        const populate = options.populate ? options.populate : '';

        const result = await this.operations.findById(id, { query, select, populate });

        ctx.successJson(result);
    }

    async patch(ctx) {
        this.checkPermissions(ctx, 'patch');

        const { id } = ctx.params;
        const data = ctx.request.fields;
        const options = ctx.request.query;
        const select = options.select ? options.select : '';
        const populate = options.populate ? options.populate : '';

        const result = await this.operations.patch(id, data, { select, populate, options });
        ctx.successJson(result);
    }

    async delete(ctx) {
        this.checkPermissions(ctx, 'delete');

        const options = ctx.request.query;
        const select = options.select ? options.select : '';
        const populate = options.populate ? options.populate : '';
        const { id } = ctx.params;
        const data = ctx.request.fields || {};
        let result;

        if (data.permanent) {
            result = await this.operations.delete(id);
        } else {
            result = await this.operations.markDeleted(id, options, select, populate);
        }

        ctx.successJson(result);
    }
}

module.exports = GenericViews;
