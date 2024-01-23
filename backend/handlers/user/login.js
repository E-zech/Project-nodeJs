import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import { userLoginValidation } from '../../validation/userJoi.js';
import chalk from 'chalk';

const login = app => {
    app.post('/users/login', async (req, res) => {
        try {
            const { error, value } = userLoginValidation.validate(req.body, { abortEarly: false });

            if (error) {
                const errorObj = error.details.map(err => err.message.replace(/['"]/g, ''));
                return res.status(400).send(errorObj);
            };

            const { email, password } = value;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).send("email or password is incorrect");
            };

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(403).send("email or password is incorrect");
            };

            const token = jwt.sign({
                userId: user._id,
                isAdmin: user.isAdmin,
                isBusiness: user.isBusiness,
            }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.send({
                message: `Hey ${user.name.first}, you have successfully logged in.`,
                token,
            });

        } catch (err) {
            console.log(chalk.red(err));
            res.status(500).send({
                error: 'Internal Server Error',
                details: err.message,
            });
        }
    });
}

export default login;

