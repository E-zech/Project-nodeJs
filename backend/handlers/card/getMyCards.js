import Card from '../../models/Card.js';
import { getUserFromTKN } from '../../configs/config.js';
import guard from '../../middleware/guard.js';

const getMyCards = app => {
    app.get('/cards/my-cards', guard, async (req, res) => {
        try {
            const token = getUserFromTKN(req, res);
            const myCards = await Card.find({ userId: token.userId });

            if (!myCards || myCards.length === 0) {
                return res.status(404).send('You dont have cards');
            }

            res.send({
                message: `Here are your cards:`,
                myCards: myCards
            });

        } catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    });
}

export default getMyCards;