(function() {
  'use strict';

  angular
    .module('app')
    .controller('LabCtrl', ['$scope', 'CourseService', 'LabService',
      function($scope, CourseService, LabService) {
        let vm = this;

        vm.newLab = {
          name: '',
          number: 1
        };
        vm.addLabError = '';

        LabService.loadLabs(CourseService.getAuthorizedCourse().courseId)
          .then((labs) => {
            vm.labs = labs;
          });

        vm.addLab = function() {
          return LabService.addLab(CourseService.getAuthorizedCourse().courseId, vm.newLab)
            .then(() => {
              vm.labs = LabService.getLabs();
              $scope.$apply();
            })
            .catch((err) => {

            });
        };
      }]);
})();