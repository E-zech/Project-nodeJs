import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../configs/config.js';
import chalk from 'chalk';

const guard = (req, res, next) => {
    jwt.verify(req.headers.authorization, JWT_SECRET, (err, data) => {
        if (err) {
            console.error(chalk.red('User not Authorized / guard.js:', err));
            res.status(401).send('User not Authorized');
        } else {
            next();
        }
    });
};

export default guard;
