(function() {
  'use strict';

  angular
    .module('app')
    .controller('CourseProfileCtrl', ['$scope', 'CourseService', function($scope, CourseService) {
      $scope.$emit('auth', CourseService.getAuthorizedCourse());
    }])
})();