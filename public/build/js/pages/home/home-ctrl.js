'use strict';

(function () {
  'use strict';

  angular.module('app').controller('HomeCtrl', ['$scope', 'CourseService', function ($scope, CourseService) {
    this.courses = CourseService.getCourses();
    this.selectedCourse = this.courses[0].courseId.toString();
    console.log(this.selectedCourse);

    this.changeCourse = function () {
      console.log(this.selectedCourse);
      console.log('adfasdf');
    };
  }]);
})();