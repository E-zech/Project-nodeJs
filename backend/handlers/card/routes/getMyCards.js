import User from '../../auth/models/User.js';
import Card from '../models/Card.js';
import { getUserId } from '../../../config.js';
import guard from '../../../guard.js';
import chalk from 'chalk';

const getMyCards = app => {
    app.get('/cards/my-cards', guard, async (req, res) => {
        try {
            const userIdByToken = getUserId(req, res);
            const userByToken = await User.findById(userIdByToken);

            const myCards = await Card.find({ userId: userIdByToken });

            // const numberedCards = myCards.map((card, index) => ({
            //     number: index + 1,
            //     ...card.toObject()  Convert Mongoose document to plain object
            // }));

            if (!myCards || myCards.length === 0) {
                return res.status(404).send('Your cards not found');
            }


            res.send({
                message: `Here are your cards, ${userByToken.name.first}:`,
                user: userIdByToken,
                myCards: myCards
            });

        } catch (error) {
            console.error(chalk.red(error.message));
            res.status(500).send(error.message);
        }
    });
}

export default getMyCards;