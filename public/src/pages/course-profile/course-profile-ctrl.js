(function() {
  'use strict';

  angular
    .module('app')
    .controller('CourseProfileCtrl', ['$scope', 'toaster', 'CourseService', function($scope, toaster, CourseService) {
      const VALIDATION_ERRORS = {
        percentForSuccess: { header: 'Процент успеха', body: 'введите значение от 20 до 100' },
        maxNumberOfAttemps: { header: 'Время выполнения', body: 'введите значение от 5 до 120' },
        timeForExecuting: { header: 'Колличество попыток в день', body: 'введите значение от 1 до 10' },
        numberOfQuestions: { header: 'Колличество вопросов в тесте', body: 'введите значение от 1 до 30' },
        minCostToLadder: { header: 'Минимальная стоимость вопроса для сдачи', body: 'неверное значение' }
      };

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
        },
        minCostToLadder: {
          current: CourseService.getAuthorizedCourse().minCostToLadder,
          real: CourseService.getAuthorizedCourse().minCostToLadder
        },
        permitToUseMinRule: {
          current: CourseService.getAuthorizedCourse().permitToUseMinRule,
          real: CourseService.getAuthorizedCourse().permitToUseMinRule
        },
        permitToCleverCount: {
          current: CourseService.getAuthorizedCourse().permitToCleverCount,
          real: CourseService.getAuthorizedCourse().permitToCleverCount
        }
      };

      vm.updateCourse = function() {
        return CourseService.updateCourse({
            percentForSuccess: vm.settings.percentForSuccess.current,
            timeForExecuting: vm.settings.timeForExecuting.current,
            maxNumberOfAttemps: vm.settings.maxNumberOfAttemps.current,
            numberOfQuestions: vm.settings.numberOfQuestions.current,
            minCostToLadder: vm.settings.minCostToLadder.current,
            permitToUseMinRule: vm.settings.permitToUseMinRule.current,
            permitToCleverCount: vm.settings.permitToCleverCount.current
          })
          .then((updatedCourse) => {
            toaster.pop('success', 'Настройки успешно обновлены!');
            changeRealValues();
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

      vm.resetOfInputs = function() {
        for (let prop in vm.settings) {
          vm.settings[prop].current = vm.settings[prop].real;
        }
      };

      vm.resetOfInputsWithApply = function() {
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