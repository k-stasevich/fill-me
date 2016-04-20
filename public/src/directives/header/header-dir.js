(function() {
  'use strict';

  angular
    .module('app')
    .directive('header', function() {
      return {
        restrict: 'E',
        templateUrl: 'build/js/directives/header/header.html',
        replace: true,
        link: function(scope, element, attrs, ctrl) {

        },
        controller: ['$scope', function($scope) {
          let vm = this;

          $scope.$on('auth', function(event, data) {
            vm.authenticatedCourse = data;
          });
        }],
        controllerAs: 'header'
      }
    })
})();