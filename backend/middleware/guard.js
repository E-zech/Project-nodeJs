import jwt from 'jsonwebtoken';

const guard = (req, res, next) => {
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            res.status(401).send('Authentication failed. Please provide a valid token');
        } else {
            next();
        }
    });
};

export default guard;
