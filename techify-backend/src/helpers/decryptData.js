'use strict';

const crypto = require("crypto");

/**
 * Decrypt data function
 * @param {*} data 
 */
const decryptData = (data) => {

    const decipher = crypto.createDecipher('aes-256-cbc', config.secretKey);

    let decryptedData = decipher.update(data, 'hex', 'utf-8');

    decryptedData += decipher.final('utf-8');

    return decryptedData;

};

/**
 * Exports format phone function
 */
module.exports = decryptData;