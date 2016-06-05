(function() {
  'use strict';

  angular
    .module('app')
    .controller('QuestionCtrl', ['$scope', 'toaster', 'QuestionService', 'LabService', 'CourseService',
      function($scope, toaster, QuestionService, LabService, CourseService) {
        const VALIDATION_ERRORS = {
          cost: { header: 'Стоимость', body: 'введите значение от 1 до 10' }
        };
        let vm = this;

        vm.questions = QuestionService.getQuestions();
        vm.labs = LabService.getLabs();
        vm.pathToCourse = '../questions/' + CourseService.getAuthorizedCourse().courseTypeTransl;

        vm.findLabQuestions = function(labId) {
          return vm.questions.findAll((item) => item.labId === labId);
        };

        vm.deleteQuestion = function(questionId) {
          return QuestionService.deleteQuestion(questionId)
            .then((updatedQuestionList) => {
              vm.questions = updatedQuestionList;
              toaster.pop('success', 'Вопрос успешно удален!');
              $scope.$apply();
            })
            .catch(() => {
              toaster.pop('error', 'Такого вопроса больше нет');
              $scope.$apply();
            });
        };

        vm.editQuestion = function(questionId, cost) {
          return QuestionService.updateQuestion(questionId, cost)
            .then((updatedQuestionList) => {
              vm.questions = updatedQuestionList;
              toaster.pop('success', 'Вопрос успешно удален!');
              $scope.$apply();
            })
            .catch((errors) => {
              if (errors.status === 400) {
                errors.data.errors.forEach((item) => {
                  toaster.pop('error', VALIDATION_ERRORS[item.param].header, VALIDATION_ERRORS[item.param].body);
                });
              }
              $scope.$apply();
            });
        };
      }]);
})();