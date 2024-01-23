import Card from '../../models/Card.js';
import { getUserFromTKN } from '../../configs/config.js';
import guard from '../../middleware/guard.js';
import chalk from 'chalk';


const likeCard = app => {

    app.patch('/cards/:id', guard, async (req, res) => {
        try {
            const token = getUserFromTKN(req, res);
            const userId = token.userId;
            const paramsId = req.params.id;
            let message = '';

            const card = await Card.findById(paramsId);

            if (!card) {
                return res.status(404).send('Card not found');
            }

            const isLikedByUser = card.likes.includes(userId);

            if (isLikedByUser) {
                card.likes = card.likes.filter(id => id.toString() !== userId);
                message = 'You unliked this card.';

            } else {
                card.likes.push(userId);
                message = 'You liked this card.';
            }
            await card.save();
            res.send({ message, card });

        } catch (error) {
            console.error(chalk.red(error.message));
            res.status(500).send(error.message);
        }
    });
}

export default likeCard;