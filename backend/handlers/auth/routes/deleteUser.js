import User from '../models/User.js';
import { getUserId } from '../../../config.js';
import guard from '../../../guard.js';
import chalk from 'chalk';


const deleteUser = app => {
    app.delete('/users/:id', guard, async (req, res) => {
        const userId = getUserId(req, res); // id of the user from the toekn ;
        const user = await User.findById(userId); // check the user in the DB by the ID from the toekn

        if (!req.params.id) {
            return res.status(400).send("Invalid or missing user ID");
        }

        if (userId !== req.params.id && !user?.isAdmin) {
            return res.status(401).send('you are not authorized to do so');
        }

        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);

            if (!deletedUser) {
                return res.status(404).send('User not found');
            }

            const message = user.isAdmin
                ? `You have deleted ${deletedUser.name.first} successfully.`
                : `It's sad to see you leaving, ${deletedUser.name.first} 🫤`;

            res.send({ message, deletedUser });

        } catch (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
    });
}

export default deleteUser;
