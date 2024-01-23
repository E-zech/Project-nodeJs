import User from '../../models/User.js';
import Card from '../../models/Card.js';
import { getUserFromTKN } from '../../configs/config.js';
import guard from '../../middleware/guard.js';
import chalk from 'chalk';

const deleteCard = app => {
    app.delete('/cards/:id', guard, async (req, res) => {
        try {
            const token = getUserFromTKN(req, res);
            const userId = token.userId;

            const cardIdByParams = req.params.id; // card id from params

            if (!userId || !cardIdByParams) {
                return res.status(400).send('Invalid user or card ID');
            }
            const card = await Card.findById(cardIdByParams); // card by id from params

            if (!card) {
                return res.status(403).send('card not found');
            }

            if (userId !== card.userId.toString() && !token.isAdmin) {
                return res.status(403).send('You are not authorized to delete this card');
            }

            const deletedCard = await Card.findByIdAndDelete(cardIdByParams);
            const message =
                userId === card.userId.toString()
                    ? `You have deleted ${card.title}.`
                    : token.isAdmin
                        ? `You have deleted ${card.title} successfully.`
                        : `You have deleted ${card.title}.`;

            res.send({ message, deletedCard });

        } catch (err) {
            console.error(chalk.red(err.message));
            res.status(500).send(err.message);
        }
    });
}

export default deleteCard;