/**
 * Import 
 */
const {
    INTERNAL_SERVER_ERROR,
    DUPLICATE_USER_ERROR,
} = require('../../../src/constant/errorMessages');
const {
    userRegisterValidationSchema,
} = require('../../../src/joiSchema');
const {
    insertUser,
    findOneUser,
} = require('../../../src/services/UserServices');
const encryptData = require('../../../src/helpers/encryptData');

/**
 * User register main function
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const userRegister = async (req, res, next) => {

    try {

        /**
         * Validate body
         */
        await validate(req.body);

        /**
         * Duplicate email check
         */
        await duplicateEmailCheck(req.body.email);

        /**
         * User data insert in database
         */
        await userDataInsert(req.body);

        /**
         * API response
         */
        return res.send({});

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

    const validateData = userRegisterValidationSchema.validate(body);

    if (validateData.error && validateData.error !== null)
        throw new Error(validateData.error.message);

};

/**
 * Duplicate email check
 */
const duplicateEmailCheck = async (email) => {

    const userData = await findOneUser({
        email,
    });

    if (userData.error)
        throw new Error(INTERNAL_SERVER_ERROR);

    if (userData.data)
        throw new Error(DUPLICATE_USER_ERROR);

    return userData.data;

};

/**
 * User data insert in database
 */
const userDataInsert = async (body) => {

    body.password = encryptData(body.password);

    const userData = await insertUser(body);

    if (userData.error)
        throw new Error(INTERNAL_SERVER_ERROR);

    return userData.data;

};

/**
 * Export function
 */
exports.post = userRegister;