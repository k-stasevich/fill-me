(function() {
  'use strict';

  angular
    .module('app')
    .service('StudentService', ['ApiService', function(ApiService) {
      let students = [];

      this.loadStudents = function() {
        return ApiService.request('/api/sec/student', 'GET')
          .then((responseStudents) => {
            students = responseStudents;
            return students;
          })
          .catch((err) => Promise.reject(err));
      };

      this.addStudent = function(student) {
        return ApiService.request('/api/sec/student', 'POST', student)
          .then((addedStudent) => {
            students.push(addedStudent);
            return students;
          })
          .catch((err) => Promise.reject(err));
      };

      this.deleteStudent = function(studentId) {
        return ApiService.request('/api/sec/student/' + studentId, 'DELETE')
          .then(() => {
            const studentIndex = students.findIndex((item) => item.studentId === studentId);
            students.splice(studentIndex, 1);
            return students;
          })
          .catch((err) => Promise.reject(err));
      };

      this.getStudents = function() {
        return students;
      }
    }]);
})();