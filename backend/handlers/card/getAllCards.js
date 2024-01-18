import Card from '../../models/Card.js';
import guard from '../../middleware/guard.js';
import chalk from 'chalk';

const getAllCards = app => {
    app.get('/cards', guard, async (req, res) => {
        try {
            const allCards = await Card.find();

            if (!allCards || allCards.length === 0) {
                return res.status(404).send('Cards not found');
            }

            res.send(allCards);

        } catch (error) {
            console.error(chalk.red(error.message));
            res.status(500).send(error.message);
        }
    });
}

export default getAllCards;