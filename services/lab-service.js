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

  getLabs: function(courseId) {
    return models.lab.findAll({
      where: { fk_course_id: courseId },
      attributes: ['lab_id', 'name', 'number', 'fk_course_id'],
      order: 'number'
    });
  }
};