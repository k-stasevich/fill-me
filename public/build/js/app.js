'use strict';

(function () {
  'use strict';

  var app = angular.module('app', ['ngRoute']);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'build/js/pages/home/home.html',
      controller: 'HomeCtrl',
      controllerAs: 'home',
      resolve: ['CourseService', function (CourseService) {
        return CourseService.init();
      }]
    });
  }]);
})();