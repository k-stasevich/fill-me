(function() {
  'use strict';

  const app = angular.module('app', [
    'ngRoute',
    'ngAnimate',
    'toaster',
    'ui.bootstrap',
    'angularFileUpload'
  ]);

  app.config(['$routeProvider', function($routeProvider) {
    const isAuthenticated = ['ApiService', '$location', function(ApiService, $location) {
      if (!ApiService.isAuthenticated()) {
        $location.path('/');
      }
    }];

    const loadLabs = ['LabService', 'CourseService', function(LabService, CourseService) {
      return LabService.loadLabs(CourseService.getAuthorizedCourse().courseId);
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
        resolve: {
          isAuthenticated: isAuthenticated,
          loadQuestions: ['QuestionService', 'CourseService', function(QuestionService, CourseService) {
            return QuestionService.loadQuestions(CourseService.getAuthorizedCourse().courseId);
          }],
          loadLabs: ['LabService', 'CourseService', function(LabService, CourseService) {
            return LabService.loadLabs(CourseService.getAuthorizedCourse().courseId, false, true);
          }]
        }
      })
      .when('/questions/add-question', {
        templateUrl: 'build/js/pages/questions/add-question/add-question.html',
        controller: 'AddQuestionCtrl',
        controllerAs: 'addQuestion',
        resolve: {
          isAuthenticated: isAuthenticated,
          loadLabs: loadLabs
        }
      })
      .when('/labs', {
        templateUrl: 'build/js/pages/labs/labs.html',
        controller: 'LabCtrl',
        controllerAs: 'lab',
        resolve: {
          isAuthenticated: isAuthenticated,
          loadLabs: loadLabs
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