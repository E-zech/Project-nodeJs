import User from '../../models/User.js';
import { getUserId } from '../../configs/config.js';
import guard from '../../middleware/guard.js';
import chalk from 'chalk';


const changeIsBusiness = app => {
    app.patch('/users/:id', guard, async (req, res) => {
        const userId = getUserId(req, res);
        const paramsId = req.params.id;


        if (userId !== paramsId) {
            return res.status(401).send('You are not authorized to update this user');
        }

        try {
            const user = await User.findById(userId).select('-password');
            user.isBusiness = !user.isBusiness;

            await user.save();

            res.send(user);


        } catch (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
    });

}

export default changeIsBusiness;



