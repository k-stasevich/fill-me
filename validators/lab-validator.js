'use strict';

const ERRORS = require('../constants/error-constants');
const models = require('../models');

module.exports = {
  validateForCreate: function(req) {
    req.checkBody('courseId', ERRORS.VALIDATION_ERROR).isInt();
    req.checkBody('labName', ERRORS.REQUIRED).isLength({ min: 1 });
    req.checkBody('labNumber', ERRORS.RANGE_ERROR).isInt({ min: 1, max: 20 });

    if (req.validationErrors()) {
      return Promise.reject(req.validationErrors());
    } else {
      // lab number should be unique
      return models.lab.find({ where: { fk_course_id: req.body.courseId, number: req.body.labNumber } })
        .then((foundLab) => {
          if (foundLab) {
            return Promise.reject([{ param: 'labNumber', msg: 'UNIQUE_ERROR' }]);
          } else {
            return true;
          }
        });
    }
  }
};
