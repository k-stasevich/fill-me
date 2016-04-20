'use strict';

const ERRORS = require('../constants/error-constants');

module.exports = {
  validateForAuth: function(req) {
    req.checkBody('courseId', ERRORS.VALIDATION_ERROR).isInt();
    req.checkBody('password', ERRORS.VALIDATION_ERROR).isAscii();

    return req.validationErrors();
  },

  validateForUpdate: function(req) {
    req.checkBody('courseId', ERRORS.VALIDATION_ERROR).isInt();
    req.checkBody('percentForSuccess', ERRORS.VALIDATION_ERROR).isInt({ min: 0, max: 100 });
    req.checkBody('timeForExecuting', ERRORS.VALIDATION_ERROR).isInt({ min: 0, max: 120 });
    req.checkBody('maxNumberOfAttemps', ERRORS.VALIDATION_ERROR).isInt({ min: 0, max: 10 });
    req.checkBody('numberOfQuestions', ERRORS.VALIDATION_ERROR).isInt({ min: 1, max: 30 });

    return req.validationErrors();
  }
};
