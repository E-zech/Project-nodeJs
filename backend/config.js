import jwt from 'jsonwebtoken';
import chalk from 'chalk';

const JWT_SECRET = "Project#nodeJs#!2024!Full&Stack!123!";

export const getUserId = (req, res) => {
    if (!req.headers.authorization) {

        console.error(chalk.yellow("Authentication failed: Authorization header missing."));
        return res.status(401).send('User not authenticated');
    }

    try {
        const token = jwt.decode(req.headers.authorization, JWT_SECRET); // i change decode
        return token.userId;// token.isBusiness , token.isAdmin

    } catch (error) {

        console.error(chalk.red("Error decoding token:", error.message));
        return res.status(401).send('User not authenticated');
    }
};

export { JWT_SECRET };
