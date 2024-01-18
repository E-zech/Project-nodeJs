import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import chalk from 'chalk';
import morgan from 'morgan';
import { coloredStatus } from './configs/morganConfig.js';
import userRoutes from './routes/userRoutes.js';
import cardRoutes from './routes/cardRoutes.js';
import logMiddleware from './middleware/logMiddleware.js';

// MongoDB Connection
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

// Express App Config
const port = 5000;
const app = express();

app.use(express.json());

app.use(cors({
    origin: true,
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
}));

app.use(express.static("public"));

// Morgan Config
morgan.token('coloredStatus', coloredStatus);
app.use(morgan(':coloredStatus :response-time ms'));

// Routes and Middleware
app.use(logMiddleware);
app.get('/', (req, res) => res.send(`Welcome 😊 \n Project NodeJs + MongoDb, 2024`));
userRoutes(app);
cardRoutes(app);

// Server Listening
app.listen(port, () => {
    console.log(chalk.green(`app is listening to port : ${chalk.bgGreen(port)}`));
});

// Error Handling
app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/public/error-page.html`);
});  