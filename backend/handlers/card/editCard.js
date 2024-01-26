import Card from '../../models/Card.js';
import { CardValid } from '../../validation/cardJoi.js';
import { getUserFromTKN } from '../../configs/config.js';
import guard from '../../middleware/guard.js';

const editCard = app => { // only admin can change biznumber do this !
    app.put('/cards/:id', guard, async (req, res) => {
        try {
            const token = getUserFromTKN(req, res);
            const userId = token.userId;
            const cardId = req.params.id; // id of the card from the params

            const card = await Card.findById(cardId);
            if (!card) {
                return res.status(404).send('Card not found');
            }

            if (card.userId != userId) {
                return res.status(403).send('you are not Authorized to update this card');
            }

            const { error, value } = CardValid.validate(req.body, { abortEarly: false });

            if (error) {
                const errorObj = error.details.map(err => err.message.replace(/['"]/g, ''));
                console.log(errorObj);
                return res.status(400).send(errorObj);
            }

            card.set(value);
            await card.save();
            res.send(card);

        } catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    });
}
export default editCard;