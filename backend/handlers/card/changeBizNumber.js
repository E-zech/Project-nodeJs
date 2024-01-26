import Card from '../../models/Card.js';
import { bizNumberValid } from '../../validation/cardJoi.js';
import { getUserFromTKN } from '../../configs/config.js';
import guard from '../../middleware/guard.js';

const changeBizNumber = app => {

    app.patch('/cards/bizNumber/:id', guard, async (req, res) => {
        try {
            const token = getUserFromTKN(req, res);
            if (!token.isAdmin) {
                return res.status(401).send('You are not authorized to update bizNumber');
            };

            const paramsId = req.params.id;
            const card = await Card.findById(paramsId);

            if (!card) {
                return res.status(404).send('Card not found');
            }

            const { error, value } = bizNumberValid.validate(req.body);
            if (error) {
                const errorObj = error.details.map(err => err.message.replace(/['"]/g, ''));
                console.log(errorObj);
                return res.status(400).send(errorObj);
            }

            const checkBizNumber = await Card.findOne({ bizNumber: value.bizNumber });
            if (checkBizNumber) {
                return res.status(409).send('BizNumber already exists');
            }

            card.bizNumber = value.bizNumber;
            card.set(value);
            await card.save();
            res.send(card);

        } catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    });
}

export default changeBizNumber;