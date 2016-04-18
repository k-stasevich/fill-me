(function() {
  'use strict';

  angular
    .module('app')
    .service('CourseService', ['ApiService', function(ApiService) {
      this.courses = [];

      this.init = function() {
        return ApiService.request('/api/course', 'GET')
          .then((response) => {
            this.courses = response.data;
          });
      };

      this.getCourses = function() {
        return this.courses;
      }
    }]);
})();