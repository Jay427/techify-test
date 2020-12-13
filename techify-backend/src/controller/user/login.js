/**
 * Import 
 */
const jwt = require('jsonwebtoken');
const config = require('../../../config');
const {
    INTERNAL_SERVER_ERROR,
    INVALID_CREDENTIAL_ERROR,
} = require('../../constant/errorMessages');
const {
    userLoginValidationSchema,
} = require('../../../src/joiSchema');
const {
    findOneUser,
    findOneAndUpdateUser,
} = require('../../../src/services/UserServices');
const encryptData = require('../../../src/helpers/encryptData');

/**
 * User login main function
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const userLogin = async (req, res, next) => {

    try {

        /**
         * Validate body
         */
        await validate(req.body);

        /**
         * Check valid credential
         */
        const user = await checkValidCredential(req.body);

        /**
         * Update JWT token in database
         */
        const jwtToken = await jwtTokenUpdate(user);

        /**
         * API response
         */
        return res.send({
            data: {
                token: jwtToken
            }
        });

    } catch (error) {

        /**
         * Error send in error handler middleware
         */
        return next(error);

    }

};

/**
 * Validate body fields using Joi validation
 */
const validate = async (body) => {

    const validateData = userLoginValidationSchema.validate(body);

    if (validateData.error && validateData.error !== null)
        throw new Error(validateData.error.message);

};

/**
 * Check valid credential in database
 */
const checkValidCredential = async (body) => {

    body.password = encryptData(body.password);

    const userData = await findOneUser(body);

    if (userData.error)
        throw new Error(INTERNAL_SERVER_ERROR);

    if (!userData.data)
        throw new Error(INVALID_CREDENTIAL_ERROR);

    return userData.data;

};

/**
 * Update jwt token in database
 */
const jwtTokenUpdate = async (user) => {

    const {
        _id,
        role,
        email,
    } = user;

    const jwtToken = jwt.sign({
        _id,
        role,
        email,
    }, config.jwtSecret, {
        expiresIn: '1d'
    });

    const query = {
        _id,
    };
    const updateData = {
        $set: {
            token: jwtToken
        },
    };

    const userData = await findOneAndUpdateUser(query, updateData);

    if (userData.error)
        throw new Error(INTERNAL_SERVER_ERROR);

    return jwtToken;

};

/**
 * Export function
 */
exports.post = userLogin;