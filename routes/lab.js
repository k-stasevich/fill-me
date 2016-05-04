'use strict';

const labService = require('../services/lab-service');
const courseService = require('../services/course-service');
const labValidator = require('../validators/lab-validator');
const rmdir = require('rmdir');
const mkdirp = require('mkdirp');
const fs = require('fs');

const ERRORS = require('../constants/error-constants');

module.exports = function(app) {
  app.route('/api/sec/lab')
    .post(addLab)
    .get(getLabs)
    .put(updateLab);

  app.route('/api/sec/lab/:labId')
    .delete(deleteLab);
};

function addLab(req, res) {
  return labValidator.validateForCreate(req)
    .then(() => {
      return courseService.read(req.body.courseId)
        .then((foundCourse) => createDirForLab(foundCourse.courseTypeTransl, req.body.number))
        .catch(() => Promise.reject({ status: 500, errors: [{ msg: ERRORS.CREATE_DIR_ERROR }] }))
        .then(() => labService.addLab(req.body.courseId, {
          name: req.body.name,
          number: req.body.number
        }))
        .then((newLab) => res.json(newLab))
        .catch((err) => res.status(err.status).json(err.errors));
    })
    .catch((err) => res.status(400).json({ errors: err }));
}

function getLabs(req, res) {
  const includeQuestions = req.query.includeQuestions === 'true';

  return labService.getLabs(req.query.courseId, includeQuestions)
    .then((labs) => res.json(labs));
}

function updateLab(req, res) {
  return labValidator.validateForUpdate(req)
    .then(() => {
      return labService.read(req.body.labId)
        .then((foundLab) => {
          const oldNumber = foundLab.number;
          const newNumber = req.body.number;

          if (oldNumber !== newNumber) {
            return renameDirForLab(foundLab.course.courseTypeTransl, oldNumber, newNumber)
          }

          return {};
        });
    })
    .then(() => {
      return labService.updateLab(req.body.labId, {
        name: req.body.name,
        number: req.body.number
      });
    })
    .then((updatedLab) => res.json(updatedLab))
    .catch((err) => res.status(400).json({ errors: err }));
}

function deleteLab(req, res) {
  const errors = labValidator.validateForDelete(req);
  if (errors) {
    return res.status(400).json({ errors: errors });
  }

  return labService.read(req.params.labId)
    .then((foundLab) => {
      return removeDirForLab(foundLab.course.courseTypeTransl, foundLab.number)
        .catch(() => {});
    })
    .then(() => {
      return labService.deleteLab(req.params.labId)
        .catch((err) => Promise.reject({ status: 404, errors: { message: ERRORS.NOT_FOUND } }))
    })
    .then(() => res.json({ labId: req.params.labId }))
    .catch((err) => res.status(err.status).json(err.errors));
}

function createDirForLab(courseType, labNumber) {
  return new Promise((resolve, reject) => {
    mkdirp('public/questions/' + courseType + '/' + labNumber, function(err) {
      if (err) {
        return reject();
      }

      return resolve();
    });
  });
}

function removeDirForLab(courseType, labNumber) {
  return new Promise((resolve, reject) => {
    rmdir('public/questions/' + courseType + '/' + labNumber, function(err, dirs, files) {
      if (err) {
        return reject();
      }

      return resolve();
    })
  });
}

function renameDirForLab(courseType, oldLabNumber, newLabNumber) {
  return new Promise((resolve, reject) => {
    const oldPath = 'public/questions/' + courseType + '/' + oldLabNumber;
    const newPath = 'public/questions/' + courseType + '/' + newLabNumber;
    return fs.rename(oldPath, newPath, (err) => {
      if (err) {
        return reject();
      }

      return resolve();
    });
  });
}