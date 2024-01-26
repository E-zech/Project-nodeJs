import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import chalk from 'chalk';
import morgan from 'morgan';
import { coloredStatus } from './configs/morganConfig.js';
import userRoutes from './routes/userRoutes.js';
import cardRoutes from './routes/cardRoutes.js';
import { initialDataStart } from './initial-data/initial-data.js';
import logMiddleware from './middleware/logMiddleware.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Assuming the 'public' folder is in the same directory as your current module
const filePath = join(__dirname, 'public', 'page404.html');

// Environment setup
const env = dotenv.config();
const port = env.parsed.PORT;


// MongoDB Connection
async function main() {
    try {
        await mongoose.connect(env.parsed.REMOTE_URL);
        console.log(chalk.green(`mongodb connection established on port : ${chalk.bgGreen('27017')}`));
        await initialDataStart();
    }
    catch (err) {
        console.error(chalk.bgRed(err));
    }
}
main();

// Express App Config
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
    res.sendFile(filePath);
});