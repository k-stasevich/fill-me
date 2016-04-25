'use strict';

const ERRORS = require('../constants/error-constants');

module.exports = {
  validateForCreate: function(req) {
    req.checkBody('fio', ERRORS.REQUIRED).isLength({ min: 1 });
    req.checkBody('groupNumber', ERRORS.REQUIRED).isLength({ min: 1 });

    return req.validationErrors();
  },

  validateForDelete: function(req) {
    req.checkParams('studentId', ERRORS.VALIDATION_ERROR).isInt();

    return req.validationErrors();
  }
};
