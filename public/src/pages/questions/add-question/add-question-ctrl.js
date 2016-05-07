(function() {
  'use strict';

  angular
    .module('app')
    .controller('AddQuestionCtrl', ['$scope', 'toaster', 'QuestionService', 'LabService', 'CourseService',
      function($scope, toaster, QuestionService, LabService, CourseService) {
        const VALIDATION_ERRORS = {
          condition: { header: 'Условие', body: 'поле обязательно для заполнения' },
          answer: { header: 'Ответ', body: 'поле обязательно для заполнения' },
          labId: { header: 'Лабораторная работа/тема', body: 'не выбрана' }
        };

        let vm = this;

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

        vm.addQuestion = function() {
          return QuestionService.addQuestion({
              courseId: CourseService.getAuthorizedCourse().courseId,
              questionTypeId: vm.newQuestion.type.id,
              labId: vm.newQuestion.lab.labId,
              labNumber: vm.newQuestion.lab.number,
              cost: vm.newQuestion.cost,
              condition: vm.newQuestion.condition,
              adviser: vm.newQuestion.adviser,
              answer: vm.newQuestion.answer
            })
            .then((createdQuestion) => {
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
      }]);
})();