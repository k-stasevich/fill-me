'use strict';

const jsonWebToken = require('jsonwebtoken');

const expressConfig = require('../config/express.json');
const ERROR_CONSTANTS = require('../constants/error-constants');

module.exports = {
  sign: function(user) {
    return jsonWebToken.sign(user, expressConfig.auth.secret, { expiresIn: expressConfig.auth.expiresIn });
  },

  verifyToken: function(token) {
    return new Promise((resolve, reject) => {
      jsonWebToken.verify(token, expressConfig.auth.secret, (err, decoded) => {
        if (err) {
          return reject({
            code: 400,
            name: ERROR_CONSTANTS.BAD_REQUEST
          });
        }

        req.decoded = decoded;
        return resolve({ success: true });
      })
    });
  }
};