import User from '../../models/User.js';
import { getUserFromTKN } from '../../configs/config.js';
import guard from '../../middleware/guard.js';
import chalk from 'chalk';


const getAllUsers = app => {
    app.get('/users', guard, async (req, res) => {
        try {
            const token = getUserFromTKN(req, res);

            if (!token.isAdmin) {
                return res.status(403).send('Access forbidden. Admins only.');
            }

            const allUsers = await User.find().select('-password');
            res.json(allUsers);

        } catch (err) {
            console.error(chalk.red(err));
            return res.status(500).send('Internal Server Error');
        }
    });
}
export default getAllUsers;

