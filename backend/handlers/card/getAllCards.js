import Card from '../../models/Card.js';

const getAllCards = app => {
    app.get('/cards', async (req, res) => {
        try {
            const allCards = await Card.find();

            if (!allCards || allCards.length === 0) {
                return res.status(404).send('Cards not found');
            }

            res.send(allCards);

        } catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    });
}

export default getAllCards;