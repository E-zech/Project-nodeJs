import Card from '../../models/Card.js';
import mongoose from 'mongoose';

const getCard = app => {
    app.get('/cards/:id', async (req, res) => {
        try {
            const paramsId = req.params.id;

            if (!mongoose.Types.ObjectId.isValid(paramsId)) {
                return res.status(400).send('Invalid card ID');
            }

            const getCard = await Card.findById(paramsId);

            if (!getCard) {
                return res.status(404).send('Card not found');
            }

            res.send(getCard);

        } catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    });
}

export default getCard;