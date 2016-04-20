(function() {
  'use strict';

  const app = angular.module('app', [
    'ngRoute'
  ]);

  app.config(['$routeProvider', function($routeProvider) {
    const isAuthenticated = ['ApiService', '$location', function(ApiService, $location) {
      if (!ApiService.isAuthenticated()) {
        $location.path('/');
      }
    }];

    $routeProvider
      .when('/', {
        templateUrl: 'build/js/pages/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home',
        resolve: ['CourseService', function(CourseService) {
          return CourseService.init();
        }]
      })
      .when('/course-profile', {
        templateUrl: 'build/js/pages/course-profile/course-profile.html',
        controller: 'CourseProfileCtrl',
        controllerAs: 'courseProfile',
        resolve: isAuthenticated
      });
  }])
})();