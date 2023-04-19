const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const usersHandler = require('./handlers/users');
const logger = require('./middleware/logger');
const redis = require('./lib/redis');

const app = express();
app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(cookieParser());

app.get('/', logger.requestInfo, (req, res) => {
    res.render(path.join(__dirname, 'views', 'users.ejs'), { users: [] });
});

app.get('/user/:id', logger.requestInfo, async (req, res) => {
    try {
        const user = await usersHandler.getUser(req.params.id);
        res.render(path.join(__dirname, 'views', 'users.ejs'), { users: [user] });
    } catch (err) {
        console.error(err);
        res.status(500).send('internal error');
    }
});

app.get('/users', logger.requestInfo, async (req, res) => {
    try {
        const users = await usersHandler.getUsers();
        res.render(path.join(__dirname, 'views', 'users.ejs'), { users: users });
    } catch (err) {
        console.error(err);
        res.status(500).send('internal error');
    }
});

app.use((err, req, res, next) => {
    res.status(500).send('Internal Server Error');
});

redis
    .connect()
    .once('ready', async () => {
        try {
            await redis.init();

            app.listen(3000, () => {
                console.log('start listening');
            });
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    })
    .on('error', (err) => {
        console.error(err);
        process.exit(1);
    });
