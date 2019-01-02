const _ = require('lodash');

function transformIdKey(object) {
    if (object._id) {
        object.id = object._id;
        delete object._id;
    }
    _.forOwn(object, (val) => {
        if (_.isPlainObject(val)) {
            transformIdKey(val);
        }
    });
}

function hidePaths(object, paths) {
    paths.forEach(function(path) {
        if (object[path]) {
            delete object[path];
        }
    });
}

function toJSONPlugin(schema) {
    let pathsToHide = schema.options.hide ? schema.options.hide : [];

    if (typeof pathsToHide === 'string') {
        pathsToHide = pathsToHide.split(' ');
        if (pathsToHide.length === 1) {
            pathsToHide = pathsToHide[0];
        }
    }

    if (typeof pathsToHide === 'string') {
        pathsToHide = pathsToHide.split(',');
    }

    if (!schema.options.toObject) {
        schema.options.toObject = { virtuals: true, versionKey: false };
    }


    if (!schema.options.toJSON) {
        schema.options.toJSON = { virtuals: true, versionKey: false };
    }

    function transform(doc, ret, options) {
        transformIdKey(ret);
        if (!options.showAll) {
            hidePaths(ret, pathsToHide);
        }
        return ret;
    }

    schema.options.toJSON.transform = transform;

    schema.options.toObject.transform = transform;
}

module.exports = toJSONPlugin;