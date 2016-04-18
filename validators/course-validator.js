'use strict';

const ERRORS = require('../constants/error-constants');

module.exports = {
  validateForAuth: function(req) {
    req.checkBody('courseId', ERRORS.VALIDATION_ERROR).isInt();
    req.checkBody('password', ERRORS.VALIDATION_ERROR).isAscii();

    return req.validationErrors();
  }
};
