'use strict';

const questionService = require('../services/question-service');
const courseService = require('../services/course-service');
const questionValidator = require('../validators/question-validator');
const fs = require('fs');
const mkdirp = require('mkdirp');
const rmdir = require('rmdir');
const move = require('mv');
const models = require('../models');

const ERRORS = require('../constants/error-constants');
const QUESTION_TYPES = require('../constants/question-type-constants');

module.exports = function(app) {
  app.route('/api/sec/question')
    .post(createQuestion)
    .get(getQuestions);

  app.route('/api/sec/question/:id')
    .delete(deleteQuestion)
    .put(updateQuestion);
};

function updateQuestion(req, res) {
  const errors = questionValidator.validateForUpdate(req);

  if (errors) {
    return res.status(400).json({ errors: errors });
  }

  return questionService.update(req.params.id, req.body.cost)
    .then((updatedQuestion) => res.json(updatedQuestion));
}

function createQuestion(req, res) {
  const errors = questionValidator.validateForCreate(req);
  if (errors) {
    return res.status(400).json({ errors: errors });
  }

  let newQuestion = {
    fk_course_id: req.body.courseId,
    fk_question_type_id: req.body.questionTypeId,
    fk_lab_id: req.body.labId,
    cost: req.body.cost,
    adviser: req.body.adviser
  };

  if (req.body.questionTypeId === QUESTION_TYPES.INPUT.id) {
    newQuestion.answer = req.body.answer.toLowerCase();
  }

  if (req.body.questionTypeId === QUESTION_TYPES.CHECKBOX.id) {
    let answerStr = '';

    for (let i = 1; i <= 5; i++) {
      if (req.body['answer' + i].isCorrect) {
        if (answerStr) {
          answerStr += ' ' + i;
        } else {
          answerStr += i;
        }
      }
    }

    newQuestion.answer = answerStr;
  }

  if (req.body.questionTypeId === QUESTION_TYPES.RELATION.id) {
    newQuestion.answer1 = req.body.answer1.linked;
    newQuestion.answer2 = req.body.answer2.linked;
    newQuestion.answer3 = req.body.answer3.linked;
    newQuestion.answer4 = req.body.answer4.linked;
    newQuestion.answer5 = req.body.answer5.linked;
    newQuestion.answer = '1 2 3 4 5'; // magic for another project that will use it :(
  }

  let questionFolderServerPath;
  let questionFolderPath;

  return models.sequelize.transaction((t) => {
      return models.question.create(newQuestion, { transaction: t })
        .then((createdQuestion) => {
          return courseService.read(req.body.courseId)
            .then((foundCourse) => {
              questionFolderServerPath = 'questions/' + foundCourse.courseTypeTransl + '/' + req.body.labNumber + '/' + createdQuestion.questionId;
              questionFolderPath = 'public/' + questionFolderServerPath;

              switch (req.body.questionTypeId) {
                case QUESTION_TYPES.INPUT.id:
                  return createFilesForInputQuestion(req.body.condition, req.body.answer, req.body.adviser, questionFolderServerPath, questionFolderPath);
                  break;
                case QUESTION_TYPES.CHECKBOX.id:
                  return createFilesForCheckboxQuestion(req.body.condition, {
                    answer1: req.body.answer1,
                    answer2: req.body.answer2,
                    answer3: req.body.answer3,
                    answer4: req.body.answer4,
                    answer5: req.body.answer5
                  }, req.body.adviser, questionFolderServerPath, questionFolderPath);
                  break;
                case QUESTION_TYPES.RELATION.id:
                  return createFilesForRelationQuestion(req.body.condition, {
                    answer1: req.body.answer1,
                    answer2: req.body.answer2,
                    answer3: req.body.answer3,
                    answer4: req.body.answer4,
                    answer5: req.body.answer5
                  }, req.body.adviser, questionFolderServerPath, questionFolderPath);
                  break;
              }
            }, { transaction: t })
            .then(() => res.json(createdQuestion))
            .catch((err) => removeDirectory(questionFolderPath))
        });
    })
    .catch((err) => res.status(500).json({ errors: [{ msg: ERRORS.INTERNAL_SERVER_ERROR }] }));
}

function getQuestions(req, res) {
  return questionService.getQuestions(req.query.courseId)
    .then((questions) => res.json(questions));
}

function deleteQuestion(req, res) {
  return questionService.read(req.params.id)
    .then((question) => {
      return new Promise((resolve, reject) => {
        const pathToQuestion = 'public/questions/' + question.Course.courseTypeTransl + '/' + question.Lab.number + '/' + question.questionId;

        rmdir(pathToQuestion, function(err, dirs, files) {
          if (err) {
            return reject({ status: 500 });
          }

          return resolve();
        });
      })
        .then(() => questionService.delete(req.params.id))
        .then((affected) => res.json(req.params.id));
    })
    .catch((err) => res.status(err.status).json({ success: false }));
}

function createFilesForInputQuestion(condition, answer, adviser, questionFolderServerPath, questionFolderPath) {
  const fileNames = getFileNames(condition);
  const conditionWithImageWithServerPath = insertImages(condition, questionFolderServerPath + '/img/');

  let previewHTML = '<div class="panel panel-primary">' +
    buildQuestionHeader(conditionWithImageWithServerPath) +
    ' <div class="panel-body">' +
    '   <div class="form-group">' +
    '     <label>Ответ</label>' +
    '     <input type="text" class="form-control" value="' + answer + '" disabled>' +
    '   </div>' +
    ' </div>' +
    buildAdvicer(adviser) +
    '</div>';

  return gatherImagesForQuestion(questionFolderPath, fileNames)
    .then(() => createConditionHtmlFile(questionFolderPath, condition))
    .then(() => createPreviewHtmlFile(questionFolderPath, previewHTML));
}

function createFilesForCheckboxQuestion(condition, answers, adviser, questionFolderServerPath, questionFolderPath) {
  const fileNames = getFileNames(condition, answers.answer1.text, answers.answer2.text, answers.answer3.text, answers.answer4.text, answers.answer5.text);
  const serverPathToImages = questionFolderServerPath + '/img/';

  const withServerPath = {
    condition: insertImages(condition, serverPathToImages),
    answer1: answers.answer1.isCorrect ? '<li class="list-group-item active">' + insertImages(answers.answer1.text, serverPathToImages) + '</li>' : '<li class="list-group-item">' + insertImages(answers.answer1.text, serverPathToImages) + '</li>',
    answer2: answers.answer2.isCorrect ? '<li class="list-group-item active">' + insertImages(answers.answer2.text, serverPathToImages) + '</li>' : '<li class="list-group-item">' + insertImages(answers.answer2.text, serverPathToImages) + '</li>',
    answer3: answers.answer3.isCorrect ? '<li class="list-group-item active">' + insertImages(answers.answer3.text, serverPathToImages) + '</li>' : '<li class="list-group-item">' + insertImages(answers.answer3.text, serverPathToImages) + '</li>',
    answer4: answers.answer4.isCorrect ? '<li class="list-group-item active">' + insertImages(answers.answer4.text, serverPathToImages) + '</li>' : '<li class="list-group-item">' + insertImages(answers.answer4.text, serverPathToImages) + '</li>',
    answer5: answers.answer5.isCorrect ? '<li class="list-group-item active">' + insertImages(answers.answer5.text, serverPathToImages) + '</li>' : '<li class="list-group-item">' + insertImages(answers.answer5.text, serverPathToImages) + '</li>'
  };

  let previewHTML = '<div class="panel panel-primary">' +
    buildQuestionHeader(withServerPath.condition) +
    ' <div class="panel-body">' +
    '   <ul class="list-group">' + withServerPath.answer1 + withServerPath.answer2 + withServerPath.answer3 + withServerPath.answer4 + withServerPath.answer5 +
    '   </ul >' +
    ' </div>' +
    buildAdvicer(adviser) +
    '</div>';

  return gatherImagesForQuestion(questionFolderPath, fileNames)
    .then(() => createConditionHtmlFile(questionFolderPath, condition))
    .then(() => createPreviewHtmlFile(questionFolderPath, previewHTML))
    .then(() => createFilesForVariants(questionFolderPath, answers));
}

function createFilesForRelationQuestion(condition, answers, adviser, questionFolderServerPath, questionFolderPath) {
  const fileNames = getFileNames(condition, answers.answer1.text, answers.answer2.text, answers.answer3.text, answers.answer4.text, answers.answer5.text);
  const serverPathToImages = questionFolderServerPath + '/img/';

  const withServerPath = {
    condition: insertImages(condition, serverPathToImages),
    answer1: '<li class="list-group-item active">' + insertImages(answers.answer1.text, serverPathToImages) + '</li>',
    answer2: '<li class="list-group-item list-group-item-success">' + insertImages(answers.answer2.text, serverPathToImages) + '</li>',
    answer3: '<li class="list-group-item list-group-item-info">' + insertImages(answers.answer3.text, serverPathToImages) + '</li>',
    answer4: '<li class="list-group-item list-group-item-warning">' + insertImages(answers.answer4.text, serverPathToImages) + '</li>',
    answer5: '<li class="list-group-item list-group-item-danger">' + insertImages(answers.answer5.text, serverPathToImages) + '</li>',
    linked1: '<li class="list-group-item active"> ' + answers.answer1.linked + '</li>',
    linked2: '<li class="list-group-item list-group-item-success"> ' + answers.answer2.linked + '</li>',
    linked3: '<li class="list-group-item list-group-item-info"> ' + answers.answer3.linked + '</li>',
    linked4: '<li class="list-group-item list-group-item-warning"> ' + answers.answer4.linked + '</li>',
    linked5: '<li class="list-group-item list-group-item-danger"> ' + answers.answer5.linked + '</li>'
  };

  let previewHTML = '<div class="panel panel-primary">' +
    buildQuestionHeader(withServerPath.condition) +
    ' <div class="panel-body">' +
    '   <div class="row">' +
    '     <div class="col-sm-6 col-xs-6 col-md-8">' +
    '       <ul class="list-group">' + withServerPath.answer1 + withServerPath.answer2 + withServerPath.answer3 + withServerPath.answer4 + withServerPath.answer5 + '</ul >' +
    '     </div>' +
    '     <div class="col-sm-6 col-xs-6 col-md-4">' +
    '       <ul class="list-group">' + withServerPath.linked1 + withServerPath.linked2 + withServerPath.linked3 + withServerPath.linked4 + withServerPath.linked5 + '</ul >' +
    '     </div>' +
    '   </div>' +
    ' </div>' +
    buildAdvicer(adviser) +
    '</div>';

  return gatherImagesForQuestion(questionFolderPath, fileNames)
    .then(() => createConditionHtmlFile(questionFolderPath, condition))
    .then(() => createPreviewHtmlFile(questionFolderPath, previewHTML))
    .then(() => createFilesForVariants(questionFolderPath, answers));
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
      fs.exists(item.from, (exists) => {
        if (exists) {
          move(item.from, item.to, { mkdirp: true }, function(err) {
            if (err) {
              return reject({ message: 'CANNOT MOVE FILES' });
            }

            return resolve();
          });
        } else {
          resolve();
        }
      });
    });
  }));
}

function getFileNames() {
  let files = [];

  for (let i = 0; i < arguments.length; i++) {
    let searchResult = arguments[i].match(/{{.*?}}/g);

    if (searchResult) {
      searchResult.forEach((item) => {
        const fileName = item.slice(2, item.length - 2);

        if (!files.find((existingFile) => existingFile === fileName)) {
          files.push(fileName);
        }
      });
    }
  }

  return files;
}

function gatherImagesForQuestion(questionFolderPath, fileNames) {
  return new Promise((resolve, reject) => {
    mkdirp(questionFolderPath, function(err) {
      if (err) {
        return reject({ message: 'directory for question was not created' });
      }

      return moveFiles(fileNames.map((fileName) => {
        return { from: 'temp-files/' + fileName, to: questionFolderPath + '/img/' + fileName };
      }))
        .then(() => resolve());
    });
  });
}

function buildAdvicer(adviser) {
  return adviser ?
  '<div class="panel-footer"><strong>Рекомендация</strong> ' + adviser + '</div>' :
    '';
}

function buildQuestionHeader(condition) {
  return '<div class="panel-heading">' + condition + ' </div>';
}

function createFilesForVariants(questionFolderPath, answers) {
  let promiseArr = [];

  for (let i = 1; i <= 5; i++) {
    promiseArr.push(new Promise((resolve, reject) => {
      const pathToFile = questionFolderPath + '/var' + i + '.html';
      const html = '<div>' + insertImages(answers["answer" + i].text, "img/") + '</div>';

      return fs.writeFile(pathToFile, wrapWithCharset(html), function(err) {
        if (err) {
          return reject({ message: 'file was not saved' });
        }

        return resolve();
      });

      function wrapWithCharset(html) {
        return '<head><meta charset="utf-8"></head><body>' + html + '</body>'
      }
    }));
  }

  return Promise.all(promiseArr);
}

function createConditionHtmlFile(questionFolderPath, condition) {
  const conditionWithImageWithRelativePath = insertImages(condition, 'img/');
  const conditionHTML = '<div class="panel panel-primary">' + buildQuestionHeader(conditionWithImageWithRelativePath) + '</div>';

  return fs.writeFile(questionFolderPath + '/condition.html', wrapContent(conditionHTML), function(err) {
    if (err) {
      return Promise.reject({ message: 'file was not saved' });
    }

    return Promise.resolve();
  });
}

function createPreviewHtmlFile(questionFolderPath, previewHTML) {
  return fs.writeFile(questionFolderPath + '/preview.html', wrapContent(previewHTML), function(err) {
    if (err) {
      return Promise.reject({ message: 'file was not saved' });
    }

    return Promise.resolve();
  });
}

function removeDirectory(path) {
  return new Promise((resolve, reject) => {
    rmdir(path, (deleteFolderError) => {
      if (deleteFolderError) {
        return reject();
      }

      return resolve();
    });
  });
}