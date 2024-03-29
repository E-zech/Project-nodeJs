import User from '../../models/User.js';
import { getUserFromTKN } from '../../configs/config.js';
import guard from '../../middleware/guard.js';

const getUser = app => {
    app.get('/users/:id', guard, async (req, res) => {

        const token = getUserFromTKN(req, res);
        const userId = token.userId;

        if (userId !== req.params.id && !token?.isAdmin) {
            return res.status(401).send('you are not authorized to do so');
        }

        try {
            const userByParams = await User.findById(req.params.id).select('-password');

            if (!userByParams) {
                return res.status(403).send('User not found');
            }

            const message =
                req.params.id === token.userId
                    ? `Here are your details, ${userByParams.name.first}.`
                    : token.isAdmin
                        ? `Here are the details of ${userByParams.name.first}.`
                        : `Here are your details, ${userByParams.name.first}.`;

            res.send({ message, userByParams });
        }

        catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    });
}

export default getUser;

