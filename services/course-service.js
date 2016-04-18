'use strict';

const models = require('../models');

module.exports = {
  getCourses: function() {
    return models.course.findAll({
      attributes: ['courseId', 'courseType', 'percentForSuccess', 'timeForExecuting', 'maxNumberOfAttemps', 'numberOfQuestions']
    });
  }
};