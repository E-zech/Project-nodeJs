import User from '../../models/User.js';
import Card from '../../models/Card.js';
import { CardValid } from '../../validation/cardJoi.js';
import { getUserId } from '../../configs/config.js';
import guard from '../../middleware/guard.js';
import chalk from 'chalk';

const createCard = app => {

    app.post('/cards', guard, async (req, res) => {
        try {

            const tokenId = getUserId(req, res); // id of the user from the toekn ;
            const user = await User.findById(tokenId); // check the user in the DB by the ID from the toekn
            if (!user) {
                return res.status(404).send('User not found');
            }

            if (!user.isBusiness) {
                return res.status(403).send('User not Authorized');
            }

            const { error, value } = CardValid.validate(req.body, { abortEarly: false });


            if (error) {
                const errorObj = error.details.map(err => err.message.replace(/['"]/g, ''));
                console.log(errorObj);
                return res.status(400).send(errorObj);
            }

            const newCard = new Card({
                ...value,
                userId: tokenId,
            });

            await newCard.save();

            res.send(newCard);

        } catch (err) {
            console.error(chalk.red(err.message));
            res.status(500).send(err.message);
        }
    });
}

export default createCard;