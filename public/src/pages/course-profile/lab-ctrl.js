(function() {
  'use strict';

  angular
    .module('app')
    .controller('LabCtrl', ['$scope', 'toaster', 'CourseService', 'LabService',
      function($scope, toaster, CourseService, LabService) {
        let vm = this;
        vm.selectedLab = {};
        vm.labs = [];
        vm.newLab = getInitialStateForNewLab();

        LabService.loadLabs(CourseService.getAuthorizedCourse().courseId)
          .then((labs) => {
            vm.labs = labs;
          });

        vm.addLab = function() {
          return LabService.addLab(CourseService.getAuthorizedCourse().courseId, vm.newLab)
            .then(() => {
              vm.labs = LabService.getLabs();
              vm.newLab = getInitialStateForNewLab();
              toaster.pop('success', 'Лабораторная работа успешно добавлена!');
              $scope.$apply();
            })
            .catch((errors) => {
              errors.data.errors.forEach((item) => {
                if (item.param === 'labName') {
                  toaster.pop('error', 'Имя лабораторной работы', 'обязательно для заполнения');
                }

                if (item.param === 'labNumber') {
                  if (item.msg === 'RANGE_ERROR') {
                    toaster.pop('error', 'Номер лабораторной работы', 'введите целое значение от 1 до 10');
                  }

                  if (item.msg === 'UNIQUE_ERROR') {
                    toaster.pop('error', 'Номер лабораторной работы', 'лабораторная работа с таким номером уже существует');
                  }
                }
              });
              $scope.$apply();
            });
        };

        vm.deleteLab = function() {
          return LabService.deleteLab(vm.selectedLab.labId)
            .then((updatedLabList) => {
              vm.labs = updatedLabList;
              vm.selectedLab = {};
              toaster.pop('success', 'Лабораторная работа успешно удалена!');
              $scope.$apply();
            })
            .catch((err) => {
              toaster.pop('error', 'Произошла какая-то ошибка', 'попробуйте повторить операцию позже');
              $scope.$apply();
            });
        };

        vm.selectLab = function(labId) {
          vm.selectedLab = vm.labs.find((lab) => labId === lab.labId);
        };

        function getInitialStateForNewLab() {
          return {
            name: '',
            number: 1
          };
        }
      }]);
})();