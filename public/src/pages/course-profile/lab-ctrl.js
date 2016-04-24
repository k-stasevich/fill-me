(function() {
  'use strict';

  angular
    .module('app')
    .controller('LabCtrl', ['$scope', 'CourseService', 'LabService',
      function($scope, CourseService, LabService) {
        let vm = this;
        vm.succesfullyAdded = false;

        vm.newLab = {
          name: '',
          number: 1
        };
        resetErrors();

        LabService.loadLabs(CourseService.getAuthorizedCourse().courseId)
          .then((labs) => {
            vm.labs = labs;
          });

        vm.addLab = function() {
          resetErrors();
          return LabService.addLab(CourseService.getAuthorizedCourse().courseId, vm.newLab)
            .then(() => {
              vm.labs = LabService.getLabs();
              vm.succesfullyAdded = true;
              $scope.$apply();
            })
            .catch((errors) => {
              errors.data.errors.forEach((item) => {
                if (item.param === 'labName') {
                  vm.addLabErrors.labName = 'Имя лабораторной работы: обязательно для заполнения';
                }
                if (item.param === 'labNumber') {
                  if (item.msg === 'RANGE_ERROR') {
                    vm.addLabErrors.labNumber.rangeError = 'Номер лабораторной работы: введите целое значение от 1 до 10';
                  }

                  if (item.msg === 'UNIQUE_ERROR') {
                    vm.addLabErrors.labNumber.uniqueError = 'Номер лабораторной работы: лабораторная работа с таким номером уже существует';
                  }
                }
              });
              vm.succesfullyAdded = false;
              $scope.$apply();
            });
        };

        function resetErrors() {
          vm.addLabErrors = { labName: '', labNumber: {} };
        }
      }]);
})();