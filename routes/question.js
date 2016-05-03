'use strict';

const questionService = require('../services/question-service');
const questionValidator = require('../validators/question-validator');

const ERRORS = require('../constants/error-constants');
const QUESTION_TYPES = require('../constants/question-type-constants');

module.exports = function(app) {
  app.route('/api/sec/question')
    .post(createQuestion)
    .get(getQuestions);
};

function createQuestion(req, res) {
  const errors = questionValidator.validateForCreate(req);
  if (errors) {
    return res.status(400).json({ errors: errors });
  }

  if (req.body.questionTypeId === QUESTION_TYPES.INPUT.id) {
    return questionService.createQuestion({
        courseId: req.body.courseId,
        questionTypeId: req.body.questionTypeId,
        labId: req.body.labId,
        cost: req.body.cost,
        condition: req.body.condition,
        adviser: req.body.adviser,
        answer: req.body.answer
      })
      .then((createdQuestion) => res.json(createdQuestion));
  }

  if (req.body.questionTypeId === QUESTION_TYPES.CHECKBOX.id) {

  }

  if (req.body.questionTypeId === QUESTION_TYPES.RELATION.id) {

  }
}

function getQuestions(req, res) {
  return questionService.getQuestions(req.query.courseId)
    .then((questions) => res.json(questions));
}