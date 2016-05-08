(function() {
  'use strict';

  angular
    .module('app')
    .controller('QuestionCtrl', ['$scope', 'QuestionService', 'LabService', 'CourseService',
      function($scope, QuestionService, LabService, CourseService) {
        let vm = this;

        vm.questions = QuestionService.getQuestions();
        vm.labs = LabService.getLabs();
        vm.pathToCourse = '../questions/' + CourseService.getAuthorizedCourse().courseTypeTransl;

        vm.findLabQuestions = function(labId) {
          return vm.questions.findAll((item) => item.labId === labId);
        };
      }]);
})();