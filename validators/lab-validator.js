'use strict';

const ERRORS = require('../constants/error-constants');

module.exports = {
  validateForCreate: function(req) {
    req.checkBody('courseId', ERRORS.VALIDATION_ERROR).isInt();
    req.checkBody('labName', ERRORS.REQUIRED).isLength({ min: 1 });
    req.checkBody('labNumber', ERRORS.VALIDATION_ERROR).isInt({ min: 1, max: 10 });

    return req.validationErrors();
  }
};
