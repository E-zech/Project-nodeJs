import User from '../models/User.js';
import { getUserId } from '../../../config.js';
import { UserValid } from '../validation/userJoi.js';
import guard from '../../../guard.js';
import chalk from 'chalk';


const editUser = app => {
    app.put('/users/:id', guard, async (req, res) => {
        const userId = getUserId(req, res); // id from token
        console.log(userId);
        const paramsId = req.params.id; // id from params

        if (userId !== paramsId) {
            return res.status(401).send('You are not authorized to update this user');
        }

        try {
            const updateUser = await User.findById(userId);

            if (!updateUser) {
                return res.status(404).send('User not found');
            }

            const { error, value } = UserValid.validate(req.body, { abortEarly: false });

            if (error) {
                const errorObj = error.details.map(err => err.message);
                console.log(errorObj)
                return res.status(400).send('Invalid request data');
            }

            value.isAdmin = updateUser.isAdmin;
            value.isBusiness = updateUser.isBusiness;

            updateUser.set(value);
            await updateUser.save();

            res.send(updateUser);

        } catch (err) {
            console.error(err.message);
            return res.status(500).send(`Error:${err.message}`);
        }
    });
}

export default editUser;
