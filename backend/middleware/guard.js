import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../configs/config.js';
import chalk from 'chalk';

const guard = (req, res, next) => {
    jwt.verify(req.headers.authorization, JWT_SECRET, (err, data) => {
        if (err) {
            console.error(chalk.red('User not Authorized / guard.js:', err.message)); // clean / guard.js
            res.status(401).send('Authentication failed. Please provide a valid token');
        } else {
            next();
        }
    });
};

export default guard;
