(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeCtrl', ['$scope', '$location', 'CourseService', function($scope, $location, CourseService) {
      this.courses = CourseService.getCourses();

      if (this.courses.length) {
        this.selectedCourse = this.courses[0].courseId.toString();
      }

      this.auth = function() {
        CourseService.auth(+this.selectedCourse, this.password)
          .then(() => {
            $location.path('/settings');
            $scope.$apply();
          })
          .catch(() => {
            this.authError = 'Неверный пароль';
            $scope.$apply();
          });
      };
    }]);
})();