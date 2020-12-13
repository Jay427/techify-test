/**
 * Load env variable
 */
require("dotenv").config();

/**
 * Imports module
 */
const Joi = require('@hapi/joi');

/**
 * Env variable validation schema
 */
const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow('local', 'development', 'production')
        .default('local'),
    PORT: Joi.number().default(4000),
    BASE_URL: Joi.string().default('http://localhost:4000'),
    FRONTEND_URL: Joi.string().default('http://localhost:3000'),
    SECRET_KEY: Joi.string().default('techify'),
    JWT_SECRET_KEY: Joi.string().default('techify'),
    MONGO_HOST: Joi.string().default('localhost'),
    MONGO_DB_NAME: Joi.string().default('techify'),
    MONGO_PORT: Joi.number().default(27017),
    MONGO_USERNAME: Joi.string().default(''),
    MONGO_PASSWORD: Joi.string().default(''),
}).unknown().required();

/**
 * Validate env variable
 */
const {
    error,
    value: envVars
} = envVarsSchema.validate(process.env);

if (error) {
    throw new Error(`Error :: Config validation error :: ${error.message}`);
}

/**
 * Config object
 */
const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    baseUrl: envVars.BASE_URL,
    frontendUrl: envVars.FRONTEND_URL,
    secretKey: envVars.SECRET_KEY,
    jwtSecret: envVars.JWT_SECRET_KEY,
    mongo: {
        host: envVars.MONGO_HOST,
        dbName: envVars.MONGO_DB_NAME,
        port: envVars.MONGO_PORT,
        username: envVars.MONGO_USERNAME,
        password: envVars.MONGO_PASSWORD,
    },
};

/**
 * Exports config
 */
module.exports = config;