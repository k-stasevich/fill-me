(function() {
  'use strict';

  angular
    .module('app')
    .controller('LogCtrl', ['$scope', 'LogService',
      function($scope, LogService) {
        let vm = this;

        vm.search = { student: '', date: new Date() };
        vm.log = LogService.getLog();

        vm.search = function() {
          return LogService.loadLog(vm.search.student, vm.search.date)
            .then((log) => {
              vm.log = log;
              $scope.$apply();
            });
        };
      }]);
})();