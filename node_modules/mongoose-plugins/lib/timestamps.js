function timestamp(schema, options = {}) {
    // Options
    const fields = {};
    const createdPath = options.createdPath || 'created';
    const modifiedPath = options.modifiedPath || 'modified';
    const useVirtual = (options.useVirtual !== undefined) ? options.useVirtual : true;

    // Add paths to schema if not present
    if (!schema.paths[createdPath]) {
        fields[modifiedPath] = { type: Date };
    }
    if (useVirtual) {
        // Use the ObjectID for extracting the created time
        schema.virtual(createdPath).get(function created() {
            return new Date(this._id.generationTime * 1000);
        });
    } else if (!schema.paths[createdPath]) {
        fields[createdPath] = {
            type: Date,
            default: Date.now,
        };
    }
    schema.add(fields);

    // Update the modified timestamp on save
    schema.pre('save', function preSave(next) {
        this[modifiedPath] = new Date();
        next();
    });
}

module.exports = timestamp;