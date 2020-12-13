/**
 * Import module
 */
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const cors = require("cors");
const logger = require('./helpers/logger');
const config = require('../config');

/**
 * Set cors middleware
 */
app.use(cors());

/**
 * Set morgan middleware
 */
app.use(morgan('dev'));

/**
 * Set middleware that only parses json
 */
app.use(bodyParser.json({
    limit: '50mb',
}));

/**
 * Set middleware for final response 
 */
app.use(require('./middleware/responseFormat'));

/**
 * API routes
 */
app.use(require('./routes'));

/**
 * Set middleware for error response 
 */
app.use(require('./middleware/errorHandler'));

/**
 * Mongodb connection
 */
require('./include/mongodbConnection');

/**
 * Server listen
 */
server.listen(config.port, () => {

    logger.info(`Server :: Start :: Port :: ${config.port}`);

});