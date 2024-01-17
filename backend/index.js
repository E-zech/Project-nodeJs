import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import moment from 'moment';
import chalk from 'chalk';
import morgan from 'morgan';
import fs from 'fs';
import { coloredStatus } from './morganConfig.js';

import signup from './handlers/auth/routes/signup.js';
import login from './handlers/auth/routes/login.js';
import getUser from './handlers/auth/routes/getUser.js';
import getAllUsers from './handlers/auth/routes/getAllUsers.js';
import editUser from './handlers/auth/routes/editUser.js';
import changeIBusiness from './handlers/auth/routes/changeIBusiness.js';
import deleteUser from './handlers/auth/routes/deleteUser.js';

import getAllCards from './handlers/card/routes/getAllCards.js';
import getMyCards from './handlers/card/routes/getMyCards.js';
import getCard from './handlers/card/routes/getCard.js';
import createCard from './handlers/card/routes/createCard.js';
import editCard from './handlers/card/routes/editCard.js';
import likeCard from './handlers/card/routes/likeCard.js';
import deleteCard from './handlers/card/routes/deleteCard.js';


async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/project-NodeJs');
        console.log(chalk.green(`mongodb connection established on port : ${chalk.bgGreen('27017')}`));
    }
    catch (err) {
        console.error(chalk.bgRed(err));
    }
}

main();

const app = express();
app.use(express.json());

app.use(cors({
    origin: true,
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
}));

morgan.token('coloredStatus', coloredStatus);
app.use(morgan(':coloredStatus :response-time ms'));

app.use((req, res, next) => {
    const fileName = `logs/log_${moment().format("Y_M_D")}.txt`;

    let content = '';

    content += `Time: ${new Date().toISOString()}\n`;
    content += `Method: ${req.method}\n`;
    content += `Route: ${req.url}\n`;

    content += '\n';

    // Capture the status code after the response has been sent
    res.on('finish', () => {
        if (res.statusCode >= 400) {
            content += `Status Code: ${res.statusCode}\n\n`;

            fs.appendFile(fileName, content, err => {
                if (err) {
                    console.error('Error writing to log file:', err);
                }
            });
        }
    });

    next();
});


const port = 5000;
app.listen(port, () => {
    console.log(chalk.green(`app is listening to port : ${chalk.bgGreen(port)}`));
});

app.use(express.static("public"));

app.get('/', (req, res) => res.send(`Welcome 😊 <br> Project NodeJs + MongoDb, 2024`));

//user routes
signup(app);
login(app);
getUser(app);
getAllUsers(app);
editUser(app);
changeIBusiness(app);
deleteUser(app);

//card routes
getAllCards(app);
getMyCards(app);
getCard(app);
createCard(app);
editCard(app);
likeCard(app);
deleteCard(app);


app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/public/error-page.html`);
});