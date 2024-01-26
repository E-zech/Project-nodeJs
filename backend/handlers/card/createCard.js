import User from '../../models/User.js';
import Card from '../../models/Card.js';
import { CardValid } from '../../validation/cardJoi.js';
import { getUserFromTKN } from '../../configs/config.js';
import guard from '../../middleware/guard.js';

const createCard = app => {
    app.post('/cards', guard, async (req, res) => {
        try {
            const token = getUserFromTKN(req, res);
            const userId = token.userId;
            const user = await User.findById(userId);
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
                userId
            });

            await newCard.save();

            res.send(newCard);

        } catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    });
}

export default createCard;