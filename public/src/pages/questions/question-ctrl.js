(function() {
  'use strict';

  angular
    .module('app')
    .controller('QuestionCtrl', ['$scope', 'QuestionService', 'LabService',
      function($scope, QuestionService, LabService) {
        let vm = this;

        vm.questions = QuestionService.getQuestions();
        vm.labs = LabService.getLabs();

        vm.findLabQuestions = function(labId) {
          return vm.questions.findAll((item) => item.labId === labId);
        };
      }]);
})();