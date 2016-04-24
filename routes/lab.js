'use strict';

const labService = require('../services/lab-service');
const labValidator = require('../validators/lab-validator');

const ERRORS = require('../constants/error-constants');

module.exports = function(app) {
  app.route('/api/sec/lab')
    .post(addLab);

  app.route('/api/sec/lab/:courseId')
    .get(getLabs);
};

function addLab(req, res) {
  return labValidator.validateForCreate(req)
    .then(() => labService.addLab(req.body.courseId, {
      name: req.body.labName,
      number: req.body.labNumber
    }))
    .then((newLab) => res.json(newLab))
    .catch((errors) => res.status(400).json({ errors: errors }));
}

function getLabs(req, res) {
  return labService.getLabs(req.params.courseId)
    .then((labs) => res.json(labs));
}