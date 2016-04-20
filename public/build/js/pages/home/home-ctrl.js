'use strict';

(function () {
  'use strict';

  angular.module('app').controller('HomeCtrl', ['$scope', '$location', 'CourseService', function ($scope, $location, CourseService) {
    this.courses = CourseService.getCourses();
    if (this.courses.length) {
      this.selectedCourse = this.courses[0].courseId.toString();
    }

    this.auth = function () {
      var _this = this;

      CourseService.auth(+this.selectedCourse, this.password).then(function () {
        $location.path('/course-profile');
        $scope.$apply();
      }).catch(function () {
        _this.authError = 'Неверный пароль';
        $scope.$apply();
      });
    };
  }]);
})();