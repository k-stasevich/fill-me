(function() {
  'use strict';

  angular
    .module('app')
    .controller('CourseProfileCtrl', ['$scope', 'CourseService', function($scope, CourseService) {
      let vm = this;

      vm.settings = {
        percentForSuccess: CourseService.getAuthorizedCourse().percentForSuccess,
        timeForExecuting: CourseService.getAuthorizedCourse().timeForExecuting,
        maxNumberOfAttemps: CourseService.getAuthorizedCourse().maxNumberOfAttemps,
        numberOfQuestions: CourseService.getAuthorizedCourse().numberOfQuestions
      };

      vm.updateCourse = function() {
        return CourseService.updateCourse(vm.settings)
          .then((updatedCourse) => {
          })
          .catch((err) => {
            console.log('COURSE PROFILE UPDATE COURSE ERROR');
            console.log(err);
          });
      };
      
      $scope.$emit('auth', CourseService.getAuthorizedCourse());
    }])
})();