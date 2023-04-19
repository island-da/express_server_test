const redisConfig = require('../config/redis_config');
const Redis = require('ioredis');

let redis = null;
exports.getClient = () => {
    return redis;
};

exports.connect = () => {
    if (!redis) {
        redis = new Redis(redisConfig);
    }
    return redis;
};

exports.init = async () => {
    await Promise.all([
        redis.set('users:1', JSON.stringify({ id: 1, name: 'alpha' })),
        redis.set('users:2', JSON.stringify({ id: 1, name: 'bravo' })),
        redis.set('users:3', JSON.stringify({ id: 1, name: 'charlie' })),
        redis.set('users:4', JSON.stringify({ id: 1, name: 'delta' })),
    ]);
};
