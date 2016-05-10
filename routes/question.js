'use strict';

const questionService = require('../services/question-service');
const courseService = require('../services/course-service');
const questionValidator = require('../validators/question-validator');
const fs = require('fs');
const mkdirp = require('mkdirp');
const move = require('mv');
const models = require('../models');

const ERRORS = require('../constants/error-constants');
const QUESTION_TYPES = require('../constants/question-type-constants');

module.exports = function(app) {
  app.route('/api/sec/question')
    .post(createQuestion)
    .get(getQuestions);
};

function createQuestion(req, res) {
  const errors = questionValidator.validateForCreate(req);
  if (errors) {
    return res.status(400).json({ errors: errors });
  }

  if (req.body.questionTypeId === QUESTION_TYPES.INPUT.id) {
    return models.sequelize.transaction((t) => {
        return models.question.create({
            fk_course_id: req.body.courseId,
            fk_question_type_id: req.body.questionTypeId,
            fk_lab_id: req.body.labId,
            cost: req.body.cost,
            adviser: req.body.adviser,
            answer: req.body.answer
          }, { transaction: t })
          .then((createdQuestion) => {
            return courseService.read(req.body.courseId)
              .then((foundCourse) => {
                return createFilesForInputQuestion(req.body.condition, req.body.answer, req.body.cost, req.body.adviser, foundCourse.courseTypeTransl, req.body.labNumber, createdQuestion.questionId)
              }, { transaction: t })
              .then(() => res.json(createdQuestion))
              .catch((err) => {
                throw new Error();
              });
          });
      })
      .catch((err) => {
        res.status(500).json({ errors: [{ msg: ERRORS.INTERNAL_SERVER_ERROR }] })
      });
  }

  if (req.body.questionTypeId === QUESTION_TYPES.CHECKBOX.id) {

  }

  if (req.body.questionTypeId === QUESTION_TYPES.RELATION.id) {

  }
}

function getQuestions(req, res) {
  return questionService.getQuestions(req.query.courseId)
    .then((questions) => res.json(questions));
}

function createFilesForInputQuestion(condition, answer, cost, adviser, courseName, labNumber, questionId) {
  const questionFolderPath = 'public/questions/' + courseName + '/' + labNumber + '/' + questionId;

  const fileNames = getFileNames(condition);
  const conditionWithImageWithRelativePath = insertImages(condition, 'img/');
  const conditionWithImageWithServerPath = insertImages(condition, 'questions/' + courseName + '/' + labNumber + '/' + questionId + '/img/');

  const advicerBlock = adviser ? '<div class="panel-footer"><strong>Рекомендация</strong> ' + adviser + '</div>' : '';
  let previewHTML = '<div class="panel panel-primary">' +
    ' <div class="panel-heading">' + conditionWithImageWithServerPath + '</div>' +
    ' <div class="panel-body">' +
    '   <div class="form-group">' +
    '     <label><span class="label label-success">' + cost + '</span> Ответ</label>' +
    '     <input type="text" class="form-control" value="' + answer + '" disabled>' +
    '   </div>' +
    ' </div>' +
    advicerBlock +
    '</div>';

  let conditionHTML = '<div class="panel panel-primary">' +
    ' <div class="panel-heading">' + conditionWithImageWithRelativePath + '</div>' +
    '</div>';

  return new Promise((resolve, reject) => {
    mkdirp(questionFolderPath, function(err) {
      if (err) {
        return reject({ message: 'directory for question was not created' });
      }

      return moveFiles(fileNames.map((fileName) => {
        return { from: 'temp-files/' + fileName, to: questionFolderPath + '/img/' + fileName };
      }))
        .then(() => {
          return fs.writeFile(questionFolderPath + '/condition.html', wrapContent(conditionHTML), function(err) {
            if (err) {
              return reject({ message: 'file was not saved' });
            }

            return fs.writeFile(questionFolderPath + '/preview.html', wrapContent(previewHTML), function(err) {
              if (err) {
                return reject({ message: 'file was not saved' });
              }

              return resolve();
            })
          });
        })
        .catch((err) => reject(err));
    });
  });
}

function wrapContent(body) {
  return '<html>' +
    ' <head>' +
    '   <meta charset="utf-8">' +
    '   <link rel="stylesheet" href="../../../../node_modules/bootstrap/dist/css/bootstrap.css">' +
    ' </head>' +
    ' <body><div class="container-fluid">' + body + '</div></body>' +
    '</html>';
}

function insertImages(str, pathPrefix) {
  let searchResult = str.match(/{{.*?}}/g);
  let replaced = str;

  if (searchResult) {
    searchResult.forEach((item) => {
      let fileName = item.slice(2, item.length - 2);

      replaced = replaced.replace(item, '<img src="' + pathPrefix + fileName + '"/>');
    });
  }

  return replaced;
}

function moveFiles(files) {
  return Promise.all(files.map((item) => {
    return new Promise((resolve, reject) => {
      move(item.from, item.to, { mkdirp: true }, function(err) {
        if (err) {
          return reject({ message: 'CANNOT MOVE FILES' });
        }

        return resolve();
      });
    });
  }));
}

function getFileNames(str) {
  let searchResult = str.match(/{{.*?}}/g);
  let files = [];

  if (searchResult) {
    searchResult.forEach((item) => {
      const fileName = item.slice(2, item.length - 2);

      if (!files.find((existingFile) => existingFile === fileName)) {
        files.push(fileName);
      }
    });
  }

  return files;
}