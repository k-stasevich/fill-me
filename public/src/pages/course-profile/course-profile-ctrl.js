(function() {
  'use strict';

  angular
    .module('app')
    .controller('CourseProfileCtrl', ['$scope', 'CourseService', function($scope, CourseService) {
      let vm = this;

      vm.settings = {
        percentForSuccess: {
          current: CourseService.getAuthorizedCourse().percentForSuccess,
          real: CourseService.getAuthorizedCourse().percentForSuccess
        },
        timeForExecuting: {
          current: CourseService.getAuthorizedCourse().timeForExecuting,
          real: CourseService.getAuthorizedCourse().timeForExecuting
        },
        maxNumberOfAttemps: {
          current: CourseService.getAuthorizedCourse().maxNumberOfAttemps,
          real: CourseService.getAuthorizedCourse().maxNumberOfAttemps
        },
        numberOfQuestions: {
          current: CourseService.getAuthorizedCourse().numberOfQuestions,
          real: CourseService.getAuthorizedCourse().numberOfQuestions
        }
      };

      vm.errors = {};
      vm.succesfullyChanged = false;

      vm.updateCourse = function() {
        return CourseService.updateCourse({
            percentForSuccess: vm.settings.percentForSuccess.current,
            timeForExecuting: vm.settings.timeForExecuting.current,
            maxNumberOfAttemps: vm.settings.maxNumberOfAttemps.current,
            numberOfQuestions: vm.settings.numberOfQuestions.current
          })
          .then((updatedCourse) => {
            vm.errors = {};
            vm.succesfullyChanged = true;
            changeRealValues();
            $scope.$apply();
          })
          .catch((err) => {
            vm.succesfullyChanged = false;
            if (err.status === 400) {
              err.data.errors.forEach((item) => {
                vm.errors[item.param] = item.msg;
                $scope.$apply();
              });
            }
          });
      };

      vm.resetOfInputs = function() {
        for (let prop in vm.settings) {
          vm.settings[prop].current = vm.settings[prop].real;
        }
        vm.errors = {};
        vm.succesfullyChanged = false;
      };

      vm.resetOfInputsWithApply = function () {
        vm.resetOfInputs();
      };

      function changeRealValues() {
        for (let prop in vm.settings) {
          vm.settings[prop].real = vm.settings[prop].current;
        }
      }

      $scope.$emit('auth', CourseService.getAuthorizedCourse());
    }])
})();