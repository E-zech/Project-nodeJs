import Card from '../../models/Card.js';
import guard from '../../middleware/guard.js';
import chalk from 'chalk';

const getCard = app => {
    app.get('/cards/:id', guard, async (req, res) => {
        try {
            const paramsId = req.params.id;
            const getCard = await Card.findById(paramsId);

            if (!getCard) {
                return res.status(404).send('Card not found');
            }

            res.send(getCard);

        } catch (error) {
            console.error(chalk.red(error.message));
            res.status(500).send(error.message);
        }
    });
}

export default getCard;