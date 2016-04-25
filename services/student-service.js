'use strict';

const models = require('../models');

module.exports = {
  getStudents: function() {
    return models.student.findAll({
      attributes: ['studentId', 'fio', 'groupNumber', 'minCost', 'maxCost'],
      order: 'groupNumber'
    });
  },

  addStudent: function(student) {
    return models.student.create(student)
      .then((createdStudent) => this.read(createdStudent.studentId));
  },

  read: function(studentId) {
    return models.student.find({
      attributes: ['studentId', 'fio', 'groupNumber', 'minCost', 'maxCost'],
      where: { studentId: studentId }
    });
  },

  deleteStudent: function(studentId) {
    return models.student.destroy({ where: { studentId: studentId } })
      .then((affected) => {
        if (!affected) {
          return Promise.reject({ status: 404 });
        }

        return studentId;
      })
  }
};