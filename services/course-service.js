'use strict';

const models = require('../models');
const webTokenService = require('./web-token-service');

module.exports = {
  getCourses: function() {
    return models.course.findAll({
      attributes: ['courseId', 'courseType', 'percentForSuccess', 'timeForExecuting', 'maxNumberOfAttemps', 'numberOfQuestions']
    });
  },

  update: function(updates, courseId) {
    return models.course.update({
        percentForSuccess: updates.percentForSuccess,
        timeForExecuting: updates.timeForExecuting,
        maxNumberOfAttemps: updates.maxNumberOfAttemps,
        numberOfQuestions: updates.numberOfQuestions
      }, {
        where: { courseId: courseId }
      })
      .then(() => {
        return models.course.find({ where: { courseId: courseId } })
      })
      .then((updatedCourse) => {
        return {
          courseId: updatedCourse.courseId,
          courseType: updatedCourse.courseType,
          percentForSuccess: updatedCourse.percentForSuccess,
          timeForExecuting: updatedCourse.timeForExecuting,
          numberOfAttemps: updatedCourse.maxNumberOfAttemps,
          numberOfQuestions: updatedCourse.numberOfQuestions
        }
      })
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
  }
};