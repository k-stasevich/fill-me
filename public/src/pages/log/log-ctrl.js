(function() {
  'use strict';

  angular
    .module('app')
    .controller('LogCtrl', ['$scope', 'LogService',
      function($scope, LogService) {
        let vm = this;

        vm.log = LogService.getLog();
      }]);
})();