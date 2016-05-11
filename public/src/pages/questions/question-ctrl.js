(function() {
  'use strict';

  angular
    .module('app')
    .controller('QuestionCtrl', ['$scope', 'toaster', 'QuestionService', 'LabService', 'CourseService',
      function($scope, toaster, QuestionService, LabService, CourseService) {
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
        }
      }]);
})();