/**
 * Import 
 */
const {
    INTERNAL_SERVER_ERROR,
} = require('../../constant/errorMessages');
const {
    findAllUser,
} = require('../../../src/services/UserServices');

/**
 * User dashboard main function
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const userDashboard = async (req, res, next) => {

    try {

        /**
         * Get user dashboard data
         */
        const userDashboardData = await getUserDashboardData(req.user);

        /**
         * API response
         */
        return res.send({
            data: {
                userDashboardData,
                role: req.user.role,
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
 * Get user dashboard data
 */
const getUserDashboardData = async (user) => {

    const {
        _id,
        email,
        role,
        createdOn,
    } = user;
    let userData;

    if (role === 'admin') {

        const users = await findAllUser({}, ['_id', 'role', 'email', 'createdOn']);

        if (users.error)
            throw new Error(INTERNAL_SERVER_ERROR);

        userData = users.data;

    } else {

        userData = [{
            _id,
            email,
            role,
            createdOn,
        }];

    }

    return userData;

};

/**
 * Export function
 */
exports.get = userDashboard;