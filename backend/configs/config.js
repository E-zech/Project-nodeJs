import jwt from 'jsonwebtoken';
import chalk from 'chalk';

const JWT_SECRET = "Project#nodeJs#!2024!Full&Stack!123!";

export const getUserFromTKN = (req, res) => {
    if (!req.headers.authorization) {
        console.error(chalk.red("Authentication failed: Authorization header missing."));
        return res.status(401).send('User not authenticated');
    }

    try {
        const token = jwt.decode(req.headers.authorization, JWT_SECRET);
        return token;

    } catch (error) {
        console.error(chalk.red("Error:", error.message));
        return res.status(401).send('User not Authorized / config.js');
    }
};

export const generateToken = (payload) => {
    // Set the token expiration time as desired
    const expiration = '1h';

    // Sign the token with the payload and secret key
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: expiration });

    return token;
};
export { JWT_SECRET };
