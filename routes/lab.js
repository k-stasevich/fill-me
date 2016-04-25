'use strict';

const labService = require('../services/lab-service');
const labValidator = require('../validators/lab-validator');

const ERRORS = require('../constants/error-constants');

module.exports = function(app) {
  app.route('/api/sec/lab')
    .post(addLab)
    .get(getLabs);

  app.route('/api/sec/lab/:labId')
    .delete(deleteLab);
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
  return labService.getLabs(req.query.courseId)
    .then((labs) => res.json(labs));
}

function deleteLab(req, res) {
  const errors = labValidator.validateForDelete(req);
  if (errors) {
    return res.status(400).json({ errors: errors });
  }

  return labService.deleteLab(req.params.labId)
    .then(() => res.json({ labId: req.params.labId }))
    .catch((err) => res.status(404).json({ message: ERRORS.NOT_FOUND }));
}
