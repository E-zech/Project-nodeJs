import User from '../models/User.js';
import Card from '../models/Card.js';
import { users, cards } from './initial-dataJSON.js';

export const initialDataStart = async () => {
    const userAmount = await User.find().countDocuments();

    if (!userAmount) {
        const userIds = [];

        for (const u of users) {
            const user = new User(u);
            const obj = await user.save();

            if (obj.isBusiness) {
                userIds.push(obj._id);
            }
        }

        for (const c of cards) {
            const card = new Card(c);
            const i = Math.floor(Math.random() * userIds.length);
            card.userId = userIds[i];
            await card.save();
        }
    }
}
