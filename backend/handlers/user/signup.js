import User from '../../models/User.js';
import { UserValid } from '../../validation/userJoi.js';
import chalk from 'chalk';

//signup 


const signup = app => {
    app.post('/signup', async (req, res) => {
        try {
            const { error, value } = UserValid.validate(req.body, { abortEarly: false }); // how to exctarct error from here

            if (error) {
                const errorObj = error.details.map(err => err.message.replace(/['"]/g, ''));
                console.log(errorObj);
                return res.status(400).send(errorObj);
            }

            const { name, isAdmin, isBusiness, phone, email, password, address, image } = value;

            const newUser = new User({
                name,
                isAdmin: false,
                isBusiness,
                phone,
                email,
                password, // Already hashed in the pre-save hook
                address,
                image,
            });

            await newUser.save();

            res.send({
                message: `Hello ${newUser.name.first}, you have successfully signed up!`,
                newUser

            });
            // fix row 33 cant send the detalis of the user

        } catch (err) {

            console.log(chalk.red(err));

            res.status(500).send({
                error: 'Internal Server Error',
                details: err.message,
            });
        }
    });
};

export default signup;


