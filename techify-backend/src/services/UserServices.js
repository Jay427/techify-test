/**
 * Import
 */
const db = require('../../src/include/mongodbConnection');
const User = require('../../src/models/User')(db);

/**
 * Insert user
 */
exports.insertUser = async (data) => {

    const container = {
        error: null,
        data: null
    };

    try {

        const userModel = new User(data);

        const user = await userModel.save();

        container.data = user;

        return (container);

    } catch (error) {

        container.error = error;

        return (container);

    }

};

/**
 * Find one user
 */
exports.findOneUser = async (query, fields = []) => {

    const container = {
        error: null,
        data: null
    };

    try {

        const user = await User.findOne(query).select(fields);

        container.data = user;

        return (container);

    } catch (error) {

        container.error = error;

        return (container);

    }

};

/**
 * Find one and update user
 */
exports.findOneAndUpdateUser = async (query, updateData) => {

    const container = {
        error: null,
        data: null
    };

    try {

        const user = await User.findOneAndUpdate(query, updateData);

        container.data = user;

        return (container);

    } catch (error) {

        container.error = error;

        return (container);

    }

};

/**
 * Find all user
 */
exports.findAllUser = async (query, fields = []) => {

    const container = {
        error: null,
        data: null
    };

    try {

        const user = await User.find(query).select(fields);

        container.data = user;

        return (container);

    } catch (error) {

        container.error = error;

        return (container);

    }

};