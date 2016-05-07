'use strict';

const ERRORS = require('../constants/error-constants');
const models = require('../models');

module.exports = {
  validateForCreate: function(req) {
    req.checkBody('courseId', ERRORS.VALIDATION_ERROR).isInt();
    req.checkBody('labId', ERRORS.VALIDATION_ERROR).isInt();
    req.checkBody('labNumber', ERRORS.VALIDATION_ERROR).isInt({ min: 1, max: 10 });
    req.checkBody('questionTypeId', ERRORS.REQUIRED).isInt({ min: 1, max: 3 });
    req.checkBody('cost', ERRORS.RANGE_ERROR).isInt({ min: 1, max: 10 });
    req.checkBody('condition', ERRORS.RANGE_ERROR).isLength({ min: 1 });

    if (req.body.questionTypeId && req.body.questionTypeId === 1) {
      req.checkBody('answer', ERRORS.RANGE_ERROR).isLength({ min: 1 });
    }

    if (req.body.questionTypeId && req.body.questionTypeId === 2) {

    }

    if (req.body.questionTypeId && req.body.questionTypeId === 3) {

    }

    return req.validationErrors();
  }
};
