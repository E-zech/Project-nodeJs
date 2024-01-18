import User from '../../models/User.js';
import Card from '../../models/Card.js';
import { getUserId } from '../../configs/config.js';
import guard from '../../middleware/guard.js';
import chalk from 'chalk';

const deleteCard = app => {
    app.delete('/cards/:id', guard, async (req, res) => {
        try {
            const userId = getUserId(req, res); // id from token 

            const userByToken = await User.findById(userId); // user by id from token

            const cardIdByParams = req.params.id; // card id from params

            if (!userByToken || !cardIdByParams) {
                return res.status(400).send('Invalid user or card ID');
            }
            const card = await Card.findById(cardIdByParams); // card by id from params

            if (!card) {
                return res.status(403).send('card not found');
            }

            if (userId !== card.userId.toString() && !userByToken.isAdmin) {
                return res.status(403).send('You are not authorized // card.js line 171');
            }

            const deleteCard = await Card.findByIdAndDelete(cardIdByParams);
            res.send(deleteCard);

        } catch (err) {
            console.error(chalk.red(err.message));
            res.status(500).send(err.message);
        }
    });
}

export default deleteCard;