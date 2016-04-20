(function() {
  'use strict';

  angular
    .module('app')
    .service('CourseService', ['ApiService', function(ApiService) {
      let courses = [];
      let authorizedCourse = {};

      this.init = function() {
        return ApiService.request('/api/course', 'GET')
          .then((response) => {
            courses = response.data;
          });
      };

      this.auth = function(courseId, password) {
        return ApiService.auth({
            courseId: courseId,
            password: password
          })
          .then((response) => {
            authorizedCourse = courses.find((item) => item.courseId = courseId);
            return response;
          })
          .catch((err) => Promise.reject(err));
      };

      this.getCourses = function() {
        return courses;
      }
    }]);
})();