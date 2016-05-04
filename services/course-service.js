'use strict';

const models = require('../models');
const webTokenService = require('./web-token-service');

module.exports = {
  getCourses: function() {
    return models.course.findAll({
      attributes: ['courseId', 'courseType', 'courseTypeTransl', 'percentForSuccess', 'timeForExecuting', 'maxNumberOfAttemps', 'numberOfQuestions',
        'minCostToLadder', 'permitToUseMinRule', 'permitToCleverCount']
    });
  },

  update: function(updates, courseId) {
    return models.course.update({
        percentForSuccess: updates.percentForSuccess,
        timeForExecuting: updates.timeForExecuting,
        maxNumberOfAttemps: updates.maxNumberOfAttemps,
        numberOfQuestions: updates.numberOfQuestions,
        minCostToLadder: updates.minCostToLadder,
        permitToUseMinRule: updates.permitToUseMinRule,
        permitToCleverCount: updates.permitToCleverCount
      }, {
        where: { courseId: courseId }
      })
      .then(() => models.course.find({
        where: { courseId: courseId },
        attributes: ['courseId', 'courseType', 'courseTypeTransl', 'percentForSuccess', 'timeForExecuting', 'maxNumberOfAttemps', 'numberOfQuestions',
          'minCostToLadder', 'permitToUseMinRule', 'permitToCleverCount']
      }))
      .catch((err) => Promise.reject(err));
  },

  auth: function(courseId, password) {
    return models.course.findOne({ where: { courseId: courseId, password: password } })
      .then((course) => {
        if (!course) {
          return Promise.reject({ code: 400 });
        }

        return webTokenService.sign({ courseId: courseId, password: password });
      });
  },

  read: function(courseId) {
    return models.course.find({
      where: { courseId: courseId },
      attributes: ['courseId', 'courseType', 'courseTypeTransl', 'percentForSuccess', 'timeForExecuting', 'maxNumberOfAttemps', 'numberOfQuestions',
        'minCostToLadder', 'permitToUseMinRule', 'permitToCleverCount']
    });
  }
};