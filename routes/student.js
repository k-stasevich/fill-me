'use strict';

const studentService = require('../services/student-service');
const studentValidator = require('../validators/student-validator');

const ERRORS = require('../constants/error-constants');

module.exports = function(app) {
  app.route('/api/sec/student')
    .get(getStudents)
    .post(addStudent);

  app.route('/api/sec/student/:studentId')
    .delete(deleteStudent);
};

function getStudents(req, res) {
  return studentService.getStudents()
    .then((students) => res.json(students));
}

function addStudent(req, res) {
  const errors = studentValidator.validateForCreate(req);
  if (errors) {
    return res.status(400).json({ errors: errors });
  }

  return studentService.addStudent({
      fio: req.body.fio,
      groupNumber: req.body.groupNumber
    })
    .then((addedStudent) => res.json(addedStudent));
}

function deleteStudent(req, res) {
  const errors = studentValidator.validateForDelete(req);
  if (errors) {
    return res.status(400).json({ errors: errors });
  }

  return studentService.deleteStudent(req.params.studentId)
    .then((affected) => res.json({ studentId: req.params.studentId }))
    .catch((err) => res.status(404).json({ message: ERRORS.NOT_FOUND }));
}
