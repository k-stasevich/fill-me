(function() {
  'use strict';

  const app = angular.module('app', [
    'ngRoute',
    'ngAnimate',
    'toaster',
    'ui.bootstrap'
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
      })
      .when('/settings', {
        templateUrl: 'build/js/pages/settings/settings.html',
        controller: 'SettingsCtrl',
        controllerAs: 'settings',
        resolve: isAuthenticated
      })
      .when('/questions', {
        templateUrl: 'build/js/pages/questions/question.html',
        controller: 'QuestionCtrl',
        controllerAs: 'question',
        resolve: isAuthenticated
      })
      .when('/labs', {
        templateUrl: 'build/js/pages/labs/labs.html',
        controller: 'LabCtrl',
        controllerAs: 'lab',
        resolve: {
          isAuthenticated: isAuthenticated,
          loadLabs: ['LabService', 'CourseService', function(LabService, CourseService) {
            return LabService.loadLabs(CourseService.getAuthorizedCourse().courseId);
          }]
        }
      })
      .when('/students', {
        templateUrl: 'build/js/pages/students/student.html',
        controller: 'StudentCtrl',
        controllerAs: 'student',
        resolve: {
          isAuthenticated: isAuthenticated,
          loadStudents: ['StudentService', function(StudentService) {
            return StudentService.loadStudents();
          }]
        }
      })
      .when('/log', {
        templateUrl: 'build/js/pages/log/log.html',
        controller: 'LogCtrl',
        controllerAs: 'log',
        resolve: {
          isAuthenticated: isAuthenticated,
          loadStudents: ['LogService', function(LogService) {
            return LogService.loadLog();
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      })
  }])
})();