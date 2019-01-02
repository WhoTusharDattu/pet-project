function NotFound(message, code) {
    if (code) {
        this.code = code;
    } else {
        this.code = 404;
    }

    this.message = message;
    this.name = 'NotFound';
}

function NotAllowed(message, code) {
    if (code) {
        this.code = code;
    } else {
        this.code = 405;
    }

    this.message = message;
    this.name = 'NotAllowed';
}

function InvalidData(message, code) {
    if (code) {
        this.code = code;
    } else {
        this.code = 400;
    }

    this.message = message || 'Invalid Data';
    this.name = 'InvalidData';
}

function InternalServerError(message, code) {
    if (code) {
        this.code = code;
    } else {
        this.code = 500;
    }

    this.message = message || 'Internal Server Error';
    this.name = 'Internal Server Error';
}

function UnauthorizedAccess(message, code) {
    if (code) {
        this.code = code;
    } else {
        this.code = 401;
    }

    this.message = message || 'Unauthorized Access';
    this.name = 'Unauthorized Access';
}

NotFound.prototype = Error.prototype;
NotAllowed.prototype = Error.prototype;
InvalidData.prototype = Error.prototype;
InternalServerError.prototype = Error.prototype;
UnauthorizedAccess.prototype = Error.prototype;

module.exports.NotFound = NotFound;
module.exports.NotAllowed = NotAllowed;
module.exports.InvalidData = InvalidData;
module.exports.InternalServerError = InternalServerError;
module.exports.UnauthorizedAccess = UnauthorizedAccess;