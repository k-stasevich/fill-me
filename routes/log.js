'use strict';

const logService = require('../services/log-service');

const ERRORS = require('../constants/error-constants');

module.exports = function(app) {
  app.route('/api/sec/log')
    .get(getLog);
};

function getLog(req, res) {
  return logService.getLog()
    .then((log) => res.json(log));
}