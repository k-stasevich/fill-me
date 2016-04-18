'use strict';

const models = require('../models');
const webTokenService = require('./web-token-service');

module.exports = {
  getCourses: function() {
    return models.course.findAll({
      attributes: ['courseId', 'courseType', 'percentForSuccess', 'timeForExecuting', 'maxNumberOfAttemps', 'numberOfQuestions']
    });
  },

  auth: function(courseId, password) {
    return models.course.findOne({ where: { courseId: courseId, password: password } })
      .then((course) => {
        if (!course) {
          return Promise.reject({ code: 400 });
        }

        return webTokenService.sign({ courseId: courseId, password: password });
      });
  }
};