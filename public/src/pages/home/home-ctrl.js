(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeCtrl', ['$scope', '$location', 'CourseService', function($scope, $location, CourseService) {
      this.courses = CourseService.getCourses();
      this.selectedCourse = this.courses[0].courseId.toString();
      this.auth = function() {
        CourseService.auth(+this.selectedCourse, this.password)
          .then(() => {
            $location.path('/course-profile');
            $scope.$apply();
          })
          .catch(() => {
            this.authError = 'Неверный пароль';
            $scope.$apply();
          });
      };
    }]);
})();