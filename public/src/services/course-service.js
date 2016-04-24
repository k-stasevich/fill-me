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

      this.updateCourse = function(updates) {
        return ApiService.request('/api/sec/course', 'PUT', {
            courseId: authorizedCourse.courseId,
            percentForSuccess: updates.percentForSuccess,
            timeForExecuting: updates.timeForExecuting,
            maxNumberOfAttemps: updates.maxNumberOfAttemps,
            numberOfQuestions: updates.numberOfQuestions
          })
          .then((response) => {
            authorizedCourse = response.data;
            const updatedCourseIndex = courses.findIndex((item) => item.courseId === authorizedCourse.courseId);
            courses[updatedCourseIndex] = authorizedCourse;

            return authorizedCourse;
          })
          .catch((err) => Promise.reject(err));
      };

      this.getCourses = function() {
        return courses;
      };

      this.getAuthorizedCourse = function() {
        return authorizedCourse;
      };
    }]);
})();