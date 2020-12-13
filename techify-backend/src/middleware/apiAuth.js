/**
 * API authentication middleware
 */
const jwt = require('jsonwebtoken');
const config = require('../../config');
const {
    UNAUTHORIZED_ERROR,
} = require('../../src/constant/errorMessages');
const {
    findOneUser,
} = require('../../src/services/UserServices');

const apiAuth = async (req, res, next) => {

    const [code, message] = UNAUTHORIZED_ERROR.split("::");
    const apiErrorResponse = {
        error: true,
        message: message || '',
        data: {},
    };
    let {
        authorization: token
    } = req.headers;

    if (token && token.startsWith("Bearer ")) {

        token = token.slice(7, token.length);

        jwt.verify(token, config.jwtSecret, async (err, decoded) => {

            if (err) {

                res.status(code).send(apiErrorResponse);

            } else {

                const userData = await findOneUser({
                    _id: decoded._id,
                    role: decoded.role,
                    email: decoded.email,
                });

                if (userData.data) {

                    req.user = userData.data;

                    return next();

                } else {

                    res.status(code).send(apiErrorResponse);

                }

            }

        });

    } else {

        res.status(code).send(apiErrorResponse);

    }

};

module.exports = apiAuth;