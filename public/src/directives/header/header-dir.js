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
        controller: ['$scope', '$location', function($scope, $location) {
          let vm = this;

          $scope.$on('auth', function(event, data) {
            vm.authenticatedCourse = data;
          });

          $scope.getClass = function(path) {
            return ($location.path().substr(0, path.length) === path) ? 'active' : '';
          }
        }],
        controllerAs: 'header'
      }
    })
})();