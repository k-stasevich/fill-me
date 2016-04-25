'use strict';

const ERRORS = require('../constants/error-constants');
const models = require('../models');

module.exports = {
  validateForCreate: function(req) {
    req.checkBody('courseId', ERRORS.VALIDATION_ERROR).isInt();
    req.checkBody('name', ERRORS.REQUIRED).isLength({ min: 1 });
    req.checkBody('number', ERRORS.RANGE_ERROR).isInt({ min: 1, max: 20 });

    if (req.validationErrors()) {
      return Promise.reject(req.validationErrors());
    } else {
      // lab number should be unique
      return models.lab.find({ where: { fk_course_id: req.body.courseId, number: req.body.number } })
        .then((foundLab) => {
          if (foundLab) {
            return Promise.reject([{ param: 'number', msg: 'UNIQUE_ERROR' }]);
          } else {
            return true;
          }
        });
    }
  },

  validateForDelete: function(req) {
    req.checkParams('labId', ERRORS.VALIDATION_ERROR).isInt();

    return req.validationErrors();
  },

  validateForUpdate: function(req) {
    req.checkBody('labId', ERRORS.VALIDATION_ERROR).isInt();
    req.checkBody('courseId', ERRORS.VALIDATION_ERROR).isInt();
    req.checkBody('name', ERRORS.REQUIRED).isLength({ min: 1 });
    req.checkBody('number', ERRORS.RANGE_ERROR).isInt({ min: 1, max: 20 });

    if (req.validationErrors()) {
      return Promise.reject(req.validationErrors());
    } else {
      // lab number should be unique

      return Promise.all([
          models.lab.find({ where: { labId: req.body.labId } }),
          models.lab.find({ where: { fk_course_id: req.body.courseId, number: req.body.number } })
        ])
        .then((result) => {
          const oldLab = result[0];
          const existingLab = result[1];

          if (existingLab && oldLab.number !== req.body.number) {
            return Promise.reject([{ param: 'number', msg: 'UNIQUE_ERROR' }]);
          } else {
            return true;
          }
        });
    }
  }
};
