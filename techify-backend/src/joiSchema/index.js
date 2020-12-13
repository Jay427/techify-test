/**
 * API joi validation
 */
const Joi = require('@hapi/joi');
const errorMessages = require('../constant/errorMessages');

exports.userLoginValidationSchema = Joi.object().keys({
	email: Joi.string().email().error(new Error(errorMessages.EMAIL_ERROR)).required(),
	password: Joi.string().min(8).error(new Error(errorMessages.PASSWORD_ERROR)).required(),
});

exports.userRegisterValidationSchema = Joi.object().keys({
	email: Joi.string().email().error(new Error(errorMessages.EMAIL_ERROR)).required(),
	password: Joi.string().min(8).error(new Error(errorMessages.PASSWORD_ERROR)).required(),
	role: Joi.string().valid('admin', 'editor').error(new Error(errorMessages.ROLE_ERROR)).required(),
});