const path = require('path');

let config = {
    name: 'maka-app-fs',
    env: process.env.NODE_ENV == 'prod' ? 'prod' : 'test',
    port: 3006,
    views: path.join(__dirname, '../views/'),
    redis: {
        host: '127.0.0.1',
        port: 6379
    }
};

module.exports = config;