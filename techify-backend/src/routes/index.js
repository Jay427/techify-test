/**
 * All API route declare with controller
 */
const express = require('express');
const router = express.Router();
const {
	forEach,
} = require('lodash');
const controller = require('../../src/controller');
const notFound = require('../../src/middleware/notFound');
const apiAuth = require('../../src/middleware/apiAuth');

/**
 * Routes declaration
 * [apiUrl, apiController, apiValidation]
 */
const routes = [
	/**
	 * User API
	 */
	['/api/v1/user/login', controller.user.login],
	['/api/v1/user/register', controller.user.register],
	['/api/v1/user/dashboard', controller.user.dashboard, 'auth'],
];

forEach(routes, function (route) {

	let middleware = function (req, res, next) {
		next();
	};

	const path = route[0];
	const destination = route[1];
	const verify = route[2] || false;

	switch (verify) {

		case 'auth':
			middleware = [apiAuth];
			break;

		default:

	}

	if (destination.get) {
		method = 'get';
	} else if (destination.post) {
		method = 'post';
	} else if (destination.put) {
		method = 'put';
	} else if (destination.delete) {
		method = 'delete';
	}

	if (method != '' && path && middleware) {

		router[method](path, middleware, destination[method] || notFound);

	}

});

/**
 * Exports router
 */
module.exports = router;