'use strict';

const logService = require('../services/log-service');
const moment = require('moment');

const ERRORS = require('../constants/error-constants');

module.exports = function(app) {
  app.route('/api/sec/log')
    .get(getLog);
};

function getLog(req, res) {
  let date = new Date();
  let student = null;

  if (req.query.date) {
    date = moment(req.query.date).toDate();
  }

  if (req.query.student) {
    student = req.query.student;
  }

  return logService.getLog(date, student)
    .then((log) => res.json(log));
}