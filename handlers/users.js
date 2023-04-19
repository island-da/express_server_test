const redis = require('../lib/redis');

exports.getUser = async (id) => {
    const key = `users:${id}`;
    const val = await redis.getClient().get(key);
    const user = JSON.parse(val);
    return user;
};

exports.getUsers = async () => {
    const stream = redis.getClient().scanStream({
        match: 'users:*',
        count: 2,
    });
    const users = [];
    for await (const resultKeys of stream) {
        for (const key of resultKeys) {
            const value = await redis.getClient().get(key);
            const user = JSON.parse(value);
            users.push(user);
        }
    }
    return users;
};
