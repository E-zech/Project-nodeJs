import Card from '../models/Card.js';
import { CardValid } from '../validation/cardJoi.js';
import { getUserId } from '../../../config.js';
import guard from '../../../guard.js';
import chalk from 'chalk';

const editCard = app => { // only admin can change biznumber do this !
    app.put('/cards/:id', guard, async (req, res) => {
        try {
            const userIdByToken = getUserId(req, res); // id of the user from the token
            const cardId = req.params.id; // id of the card from the params

            const card = await Card.findById(cardId);
            if (!card) {
                return res.status(404).send('Card not found');
            }

            if (card.userId != userIdByToken) {
                return res.status(403).send('you are not Authorized //card.js line 81');
            }

            const { error, value } = CardValid.validate(req.body, { abortEarly: false });

            if (error) {
                const errorObj = error.details.map(err => err.message);
                console.log(errorObj);
                return res.status(400).send(errorObj);
            }


            card.set(value);

            await card.save();
            res.send(card);

        } catch (err) {
            console.error(chalk.red(err.message));
            res.status(500).send(err.message);
        }
    });
}
export default editCard;