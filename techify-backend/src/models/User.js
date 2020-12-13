/**
 * User model schema
 */
const mongoose = require('mongoose');

const schema = {
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "editor"],
        default: "editor"
    },
    token: {
        type: String,
        default: null
    },
    updatedOn: {
        type: Date,
        default: Date.now
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
};

const UserSchema = new mongoose.Schema(schema);

const User = function (db) {

    if (db) return db.model('User', UserSchema);

    return mongoose.model('User', UserSchema);

};

module.exports = User;