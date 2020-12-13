'use strict';

const config = require('../../config')
const crypto = require("crypto");

/**
 * Encrypt data function
 * @param {*} data 
 */
const encryptData = (data) => {

    const cipher = crypto.createCipher('aes-256-cbc', config.secretKey);

    let cryptoData = cipher.update(data, 'utf-8', 'hex');

    cryptoData += cipher.final('hex');

    return cryptoData;

};

/**
 * Exports format phone function
 */
module.exports = encryptData;