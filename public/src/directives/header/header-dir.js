(function() {
  'use strict';

  angular
    .module('app')
    .directive('header', function() {
      return {
        restrict: 'E',
        link: function(scope, element, attrs) {

        },
        templateUrl: 'build/js/directives/header/header.html',
        replace: true
      }
    })
})();