const path = require('path');

const root = path.resolve(__dirname, '..');

module.exports = {
    rootDirectory: root,
    port: 80,
    keys: ['12345689', '098765432'],
    logs: {
        path: path.join(root, 'logs', 'nascence.log'),
    },
    parser: {
        formLimit: '100mb',
        textLimit: '100mb',
        jsonLimit: '100mb',
    },
    authentication: {
        tokenKey: 'authToken',
    },
    cors: {
        enabled: true,
        credentials: true,
    },
    mongoDb: {
        url: 'mongodb://localhost/boilerplate',
    },
};
