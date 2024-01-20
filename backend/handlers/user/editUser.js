import User from '../../models/User.js';
import { getUserFromTKN } from '../../configs/config.js';
import { UserValid } from '../../validation/userJoi.js';
import guard from '../../middleware/guard.js';
import TokenBlacklist from '../../models/shared/TokenBlacklist.js';
import bcrypt from 'bcrypt';



const editUser = app => {
    app.put('/users/:id', guard, async (req, res) => {
        const token = getUserFromTKN(req, res);
        const userId = token.userId;
        let logout = false;

        const paramsId = req.params.id; // id from params

        if (userId !== paramsId) {
            return res.status(401).send('You are not authorized to update this user');
        }

        try {
            const { error, value } = UserValid.validate(req.body, { abortEarly: false });

            if (error) {
                const errorObj = error.details.map(err => err.message.replace(/['"]/g, ''));
                console.log(errorObj); // clean
                return res.status(400).send('Invalid request data');
            }

            const updateUser = await User.findById(userId);

            if (!updateUser) {
                return res.status(404).send('User not found');
            }
            value.isAdmin = token.isAdmin;
            value.isBusiness = token.isBusiness;

            const passwordMatch = await bcrypt.compare(value.password, updateUser.password);

            if (!passwordMatch) {
                logout = true;
            }

            updateUser.set(value);
            await updateUser.save();

            const user = {
                ...updateUser.toObject(),
                password: undefined,
            };

            if (logout) {
                console.log(token);

                // Check if the token is already in the blacklist
                const isTokenInvalid = await TokenBlacklist.exists({ token });

                if (!isTokenInvalid) {
                    // If the token is not in the blacklist, add it
                    const tokenBlacklist = new TokenBlacklist({ token });
                    await tokenBlacklist.save();
                    console.log(tokenBlacklist);
                } else {
                    console.log("Token is already in the blacklist.");
                }

                return res.send({
                    message: "Password changed. Token deleted. Please log in again.",
                    user: user
                });
            }

            res.send({
                message: "User updated successfully.",
                user: user
            });

        } catch (err) {
            console.error(err.message);
            return res.status(500).send(`Error:${err.message}`);
        }
    });
}

export default editUser;
