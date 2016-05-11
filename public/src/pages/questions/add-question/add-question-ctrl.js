(function() {
  'use strict';

  angular
    .module('app')
    .controller('AddQuestionCtrl', ['$scope', 'toaster', 'FileUploader', 'QuestionService', 'LabService', 'CourseService',
      function($scope, toaster, FileUploader, QuestionService, LabService, CourseService) {
        const VALIDATION_ERRORS = {
          condition: { header: 'Условие', body: 'поле обязательно для заполнения' },
          answer: { header: 'Ответ', body: 'поле обязательно для заполнения' },
          no_one_correct: { header: 'Ответ', body: 'Не выбрано ни одного верного ответа' },
          labId: { header: 'Лабораторная работа/тема', body: 'не выбрана' },
          answer1: { header: 'Ответ1', body: 'заполните поле "Ответ1"' },
          answer2: { header: 'Ответ2', body: 'заполните поле "Ответ2"' },
          answer3: { header: 'Ответ3', body: 'заполните поле "Ответ3"' },
          answer4: { header: 'Ответ4', body: 'заполните поле "Ответ4"' },
          answer5: { header: 'Ответ5', body: 'заполните поле "Ответ5"' }
        };

        let vm = this;

        vm.fileUploader = new FileUploader();

        vm.QUESTION_TYPES = {
          INPUT: { id: 1, description: 'Ввод ответа c клавиатуры' },
          CHECKBOX: { id: 2, description: 'Выбор ответа из предложеных' },
          RELATION: { id: 3, description: 'Выбор соответствующих ответов из предложенных' }
        };
        vm.QUESTION_COST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        vm.labs = LabService.getLabs();
        vm.selectedQuestionType = vm.QUESTION_TYPES.INPUT;
        vm.newQuestion = {
          courseId: CourseService.getAuthorizedCourse().courseId,
          type: vm.QUESTION_TYPES.INPUT,
          lab: vm.labs[0] ? vm.labs[0] : {},
          cost: vm.QUESTION_COST[0],
          condition: '',
          answer: '',
          adviser: ''
        };
        vm.isAddButtonDisabled = false;

        vm.addQuestion = function() {
          return addQuestion()
            .then((createdQuestion) => {
              vm.fileUploader.queue = [];
              clearFields();
              toaster.pop('success', 'Вопрос был успешно создан!');
              $scope.$apply();
            })
            .catch((err) => {
              if (err.status === 400) {
                err.data.errors.forEach((item) => {
                  if (VALIDATION_ERRORS[item.param]) {
                    toaster.pop('error', VALIDATION_ERRORS[item.param].header, VALIDATION_ERRORS[item.param].body);
                  }
                });
              }

              if (err.status === 500) {
                toaster.pop('error', 'Операция не удалась', 'Попробуйте позже');
              }

              $scope.$apply();
            });
        };

        vm.removeFile = function(item) {
          vm.fileUploader.removeFromQueue(item);
          vm.canAdd = !checkIfAllFilesLoaded();
        };

        vm.fileUploader.onAfterAddingFile = function(fileItem) {
          vm.canAdd = !checkIfAllFilesLoaded();
          $scope.$apply();
        };
        vm.fileUploader.onCompleteAll = function() {
          vm.canAdd = !checkIfAllFilesLoaded();
          $scope.$apply();
        };

        function clearFields() {
          vm.newQuestion.cost = vm.QUESTION_COST[0];
          vm.newQuestion.condition = '';
          vm.newQuestion.answer = '';
          vm.newQuestion.adviser = '';
          vm.newQuestion.answer1 = {};
          vm.newQuestion.answer2 = {};
          vm.newQuestion.answer3 = {};
          vm.newQuestion.answer4 = {};
          vm.newQuestion.answer5 = {};
        }

        function checkIfAllFilesLoaded() {
          return !vm.fileUploader.queue.find((file) => file.isUploaded === false);
        }

        function addQuestion() {
          if (vm.newQuestion.type.id === vm.QUESTION_TYPES.INPUT.id) {
            return addInputQuestion();
          }

          if (vm.newQuestion.type.id === vm.QUESTION_TYPES.CHECKBOX.id) {
            return addCheckboxQuestion();
          }

          if (vm.newQuestion.type.id === vm.QUESTION_TYPES.RELATION.id) {
            return addRelationQuestion();
          }
        }

        function addInputQuestion() {
          return QuestionService.addQuestion({
            courseId: CourseService.getAuthorizedCourse().courseId,
            questionTypeId: vm.newQuestion.type.id,
            labId: vm.newQuestion.lab.labId,
            labNumber: vm.newQuestion.lab.number,
            cost: vm.newQuestion.cost,
            condition: vm.newQuestion.condition,
            adviser: vm.newQuestion.adviser,
            answer: vm.newQuestion.answer
          });
        }

        function addCheckboxQuestion() {
          return QuestionService.addQuestion({
            courseId: CourseService.getAuthorizedCourse().courseId,
            questionTypeId: vm.newQuestion.type.id,
            labId: vm.newQuestion.lab.labId,
            labNumber: vm.newQuestion.lab.number,
            cost: vm.newQuestion.cost,
            condition: vm.newQuestion.condition,
            adviser: vm.newQuestion.adviser,
            answer1: vm.newQuestion.answer1,
            answer2: vm.newQuestion.answer2,
            answer3: vm.newQuestion.answer3,
            answer4: vm.newQuestion.answer4,
            answer5: vm.newQuestion.answer5
          });
        }

        function addRelationQuestion() {
          return QuestionService.addQuestion({
            courseId: CourseService.getAuthorizedCourse().courseId,
            questionTypeId: vm.newQuestion.type.id,
            labId: vm.newQuestion.lab.labId,
            labNumber: vm.newQuestion.lab.number,
            cost: vm.newQuestion.cost,
            condition: vm.newQuestion.condition,
            adviser: vm.newQuestion.adviser,
            answer1: vm.newQuestion.answer1,
            answer2: vm.newQuestion.answer2,
            answer3: vm.newQuestion.answer3,
            answer4: vm.newQuestion.answer4,
            answer5: vm.newQuestion.answer5
          });
        }
      }]);
})();