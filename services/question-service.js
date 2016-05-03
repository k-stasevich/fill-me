'use strict';

const models = require('../models');

module.exports = {
  createQuestion: function(question) {
    return models.question.create({
        fk_course_id: question.courseId,
        fk_question_type_id: question.questionTypeId,
        fk_lab_id: question.labId,
        cost: question.cost,
        adviser: question.adviser,
        answer: question.answer
      })
      .then((createdQuestion) => this.read(createdQuestion.questionId));
  },

  read: function(id) {
    return models.question.find({
        where: { questionId: id },
        attributes: ['questionId', 'cost', 'adviser', 'answer', 'fk_question_type_id', 'fk_course_id', 'fk_lab_id']
      })
      .then((foundQuestion) => {
        if (foundQuestion) {
          return {
            questionId: foundQuestion.questionId,
            cost: foundQuestion.cost,
            adviser: foundQuestion.adviser,
            answer: foundQuestion.answer,
            questionTypeId: foundQuestion.fk_question_type_id,
            courseId: foundQuestion.fk_course_id
          };
        }

        return Promise.reject({ status: 404 });
      });
  },

  getQuestions: function(courseId) {
    return models.question.findAll({
      where: { fk_course_id: courseId },
      attributes: ['questionId', 'cost', 'adviser', 'answer', 'fk_question_type_id', 'fk_course_id', 'fk_lab_id']
    })
    .then((questions) => {
      return questions.map((item) => {
        return {
          questionId: item.questionId,
          cost: item.cost,
          adviser: item.adviser,
          answer: item.answer,
          questionTypeId: item.fk_question_type_id,
          courseId: item.fk_course_id
        };
      });
    });
  }
};