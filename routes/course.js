'use strict';

const courseService = require('../services/course-service');
const courseValidator = require('../validators/course-validator');

const ERRORS = require('../constants/error-constants');

module.exports = function(app) {
  app.route('/api/course')
    .get(getCourses);

  app.route('/api/auth')
    .post(auth);
};

function getCourses(req, res) {
  return courseService.getCourses()
    .then((courses) => res.json({ success: true, data: courses }));
}

function auth(req, res) {
  const errors = courseValidator.validateForAuth(req);

  if (errors) {
    return res.status(400).json({ errors: errors });
  }

  return courseService.auth(req.body.courseId, req.body.password)
    .then((token) => res.json({ success: true, token: token }))
    .catch((err) => res.status(400).json({ message: ERRORS.INVALID_LOGIN_OR_PASSWORD }));
}