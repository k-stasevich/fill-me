'use strict';

const models = require('../models');

module.exports = {
  addLab: function(courseId, lab) {
    return models.lab.create({
        fk_course_id: courseId,
        name: lab.name,
        number: lab.number
      })
      .then((createdLab) => {
        return {
          labId: createdLab.labId,
          name: createdLab.name,
          number: createdLab.number
        }
      })
  },

  updateLab: function(labId, updates) {
    return models.lab.update(updates, { where: { labId: labId } })
      .then((updatedLab) => {
        return {
          labId: updatedLab.labId,
          name: updatedLab.name,
          number: updatedLab.number
        };
      })
      .catch((err) => Promise.reject(err));
  },

  deleteLab: function(labId) {
    return models.lab.destroy({ where: { labId: labId } })
      .then((affected) => {
        if (!affected) {
          return Promise.reject({ status: 404 });
        }

        return labId;
      });
  },

  getLabs: function(courseId, withQuestions) {
    if (withQuestions === 'undefined') {
      withQuestions = false;
    }

    const options = {
      where: { fk_course_id: courseId },
      attributes: ['labId', 'name', 'number'],
      order: 'number'
    };

    if (withQuestions) {
      options.include = {
        model: models.question,
        attributes: ['questionId', 'cost', 'adviser', 'answer', 'fk_question_type_id', 'fk_course_id', 'fk_lab_id']
      }
    }

    return models.lab.findAll(options);
  },

  read: function(labId) {
    return models.lab.find({
      where: { labId: labId },
      attributes: ['labId', 'name', 'number', 'fk_course_id'],
      include: {
        model: models.course,
        attributes: ['courseId', 'courseType', 'courseTypeTransl', 'percentForSuccess', 'timeForExecuting', 'maxNumberOfAttemps', 'numberOfQuestions',
          'minCostToLadder', 'permitToUseMinRule', 'permitToCleverCount']
      }
    });
  }
};