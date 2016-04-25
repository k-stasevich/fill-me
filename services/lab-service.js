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

  getLabs: function(courseId) {
    return models.lab.findAll({
      where: { fk_course_id: courseId },
      attributes: ['labId', 'name', 'number'],
      order: 'number'
    });
  }
};