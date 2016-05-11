'use strict';

const models = require('../models');
const ERRORS = require('../constants/error-constants');
const QUESTION_TYPES = require('../constants/question-type-constants');

module.exports = {
  validateForCreate: function(req) {
    req.checkBody('courseId', ERRORS.VALIDATION_ERROR).isInt();
    req.checkBody('labId', ERRORS.VALIDATION_ERROR).isInt();
    req.checkBody('labNumber', ERRORS.VALIDATION_ERROR).isInt({ min: 1, max: 10 });
    req.checkBody('questionTypeId', ERRORS.REQUIRED).isInt({ min: 1, max: 3 });
    req.checkBody('cost', ERRORS.RANGE_ERROR).isInt({ min: 1, max: 10 });
    req.checkBody('condition', ERRORS.VALIDATION_ERROR).isLength({ min: 1 });

    if (req.body.questionTypeId && req.body.questionTypeId === QUESTION_TYPES.INPUT.id) {
      req.checkBody('answer', ERRORS.RANGE_ERROR).isLength({ min: 1 });
    }

    if (req.body.questionTypeId && req.body.questionTypeId === QUESTION_TYPES.CHECKBOX.id) {
      let answers = [];

      for (let i = 1; i <= 5; i++) {
        if (req.body['answer' + i]) {
          answers.push(req.body['answer' + i]);
        }

        if (!req.body['answer' + i] || !req.body['answer' + i].text) {
          req._validationErrors.push({ param: 'answer' + i, msg: 'VALIDATION_ERROR' });
        }
      }

      if (!answers.find((item) => item.isCorrect)) {
        req._validationErrors.push({ param: 'no_one_correct', msg: 'NO_ONE_CORRECT' });
      }
    }

    if (req.body.questionTypeId && req.body.questionTypeId === QUESTION_TYPES.RELATION.id) {

    }

    return req.validationErrors();
  }
};
