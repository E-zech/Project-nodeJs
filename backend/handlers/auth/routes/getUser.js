import User from '../models/User.js';
import { getUserId } from '../../../config.js';
import guard from '../../../guard.js';
import chalk from 'chalk';


const getUser = app => {
    app.get('/users/:id', guard, async (req, res) => {

        const userId = getUserId(req, res);
        const userByToken = await User.findById(userId); /// change the name of the constant 1

        if (userId !== req.params.id && !userByToken?.isAdmin) {
            return res.status(401).send('you are not authorized to do so');
        }

        try {
            const userByParams = await User.findById(req.params.id).select('-password');/// change the name of the constant 2


            if (!userByParams) {
                return res.status(403).send('User not found');
            }

            const message = userByToken.isAdmin
                ? `Here are the details of ${userByParams.name.first}.`
                : `Here are your details, ${userByParams.name.first}.`;


            res.send({ message, userByParams });
        }

        catch (err) {
            console.log(err)
            return res.status(403).send('User not found');
        }
    });
}

export default getUser;

