'use strict';

const courseService = require('../services/course-service');

module.exports = function(app) {
  app.route('/api/course')
    .get(getCourses);
};

function getCourses(req, res) {
  return courseService.getCourses()
    .then((courses) => {
      res.json({
        success: true,
        data: courses
      });
    });
}