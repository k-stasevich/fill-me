(function() {
  'use strict';

  angular
    .module('app')
    .controller('StudentCtrl', ['$scope', 'toaster', 'StudentService',
      function($scope, toaster, StudentService) {
        const VALIDATION_ERRORS = {
          groupNumber: { header: 'Номер группы', body: 'поле обязательно' },
          fio: { header: 'ФИО', body: 'поле обязательно' }
        };
        let vm = this;
        vm.students = StudentService.getStudents();
        vm.newStudent = getInitialStateForNewStudent();

        vm.addStudent = function() {
          return StudentService.addStudent(vm.newStudent)
            .then((updatedStudentList) => {
              vm.students = updatedStudentList;
              toaster.pop('success', 'Студент успешно добавлен!');
              vm.newStudent = getInitialStateForNewStudent();
              $scope.$apply();
            })
            .catch((err) => {
              if (err.status === 400) {
                err.data.errors.forEach((item) => {
                  toaster.pop('error', VALIDATION_ERRORS[item.param].header, VALIDATION_ERRORS[item.param].body);
                });
              }
              $scope.$apply();
            });
        };

        vm.deleteStudent = function(studentId) {
          return StudentService.deleteStudent(studentId)
            .then((updatedStudentList) => {
              vm.students = updatedStudentList;
              toaster.pop('success', 'Студент успешно удален!');
              $scope.$apply();
            })
            .catch((err) => {
              toaster.pop('error', 'Произошла какая-то ошибка', 'попробуйте повторить операцию позже');
              $scope.$apply();
            })
        };

        function getInitialStateForNewStudent() {
          return { fio: '', groupNumber: '' };
        }
      }]);
})();