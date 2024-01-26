import User from '../../models/User.js';
import { getUserFromTKN } from '../../configs/config.js';
import { UserValid } from '../../validation/userJoi.js';
import guard from '../../middleware/guard.js';

const editUser = app => {
    app.put('/users/:id', guard, async (req, res) => {
        const token = getUserFromTKN(req, res);
        const userId = token.userId;
        const paramsId = req.params.id; // id from params

        if (userId !== paramsId) {
            return res.status(401).send('You are not authorized to update this user');
        }

        try {
            const { error, value } = UserValid.validate(req.body, { abortEarly: false });

            if (error) {
                const errorObj = error.details.map(err => err.message.replace(/['"]/g, ''));
                return res.status(400).send(errorObj);
            }

            const updateUser = await User.findById(userId);

            if (!updateUser) {
                return res.status(404).send('User not found');
            }

            value.isAdmin = token.isAdmin;
            value.isBusiness = token.isBusiness;

            updateUser.set(value);
            await updateUser.save();

            const user = {
                ...updateUser.toObject(),
                password: undefined,
            };

            res.send({
                message: "User updated successfully.",
                user: user
            });

        } catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    });
}

export default editUser;
