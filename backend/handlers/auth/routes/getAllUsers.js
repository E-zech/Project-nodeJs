import User from '../models/User.js';
import { getUserId } from '../../../config.js';
import guard from '../../../guard.js';
import chalk from 'chalk';


const getAllUsers = app => {
    app.get('/users', guard, async (req, res) => {
        try {
            const userId = getUserId(req, res);

            if (!userId) {
                return res.status(401).send('User not authenticated');
            }

            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).send('User not found');
            }

            if (user.isAdmin) {
                const allUsers = await User.find().select('-password');

                return res.json(allUsers);

            } else {

                return res.status(403).send('Access forbidden. Admins only.');
            }

        } catch (err) {

            console.error(chalk.red(err));
            return res.status(500).send('Internal Server Error');
        }
    });
}
export default getAllUsers;

