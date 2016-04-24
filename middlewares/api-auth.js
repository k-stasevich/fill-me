'use strict';

const webTokenService = require('../services/web-token-service');
const ERROR_CONSTANTS = require('../constants/error-constants');

module.exports = function(app) {
  app.use('/api/sec', apiAuth);
};

function apiAuth(req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-token'];

  if (token) {
    return webTokenService.verifyToken(token)
      .then(() => next())
      .catch(() => res.status(401).json(getForbiddenError()));
  } else {
    return res.status(401).json(getForbiddenError());
  }
}

function getForbiddenError() {
  return {
    name: ERROR_CONSTANTS.FORBIDDEN,
    code: 403
  };
}
