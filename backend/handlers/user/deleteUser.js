import User from '../../models/User.js';
import { getUserFromTKN } from '../../configs/config.js';
import guard from '../../middleware/guard.js';
import chalk from 'chalk';


const deleteUser = app => {
    app.delete('/users/:id', guard, async (req, res) => {
        const token = getUserFromTKN(req, res);
        const userId = token.userId;

        if (!req.params.id) {
            return res.status(400).send("Invalid or missing user ID");
        }

        if (userId !== req.params.id && !token?.isAdmin) {
            return res.status(401).send('you are not authorized to do so');
        }

        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);

            if (!deletedUser) {
                return res.status(404).send('User not found');
            }

            const message =
                req.params.id === token.userId
                    ? `It's sad to see you leaving, ${deletedUser.name.first} 🫤`
                    : token.isAdmin
                        ? `You have deleted ${deletedUser.name.first} successfully.`
                        : `It's sad to see you leaving, ${deletedUser.name.first} 🫤`;

            res.send({ message, deletedUser });

        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Internal Server Error');
        }
    });
}

export default deleteUser; 
