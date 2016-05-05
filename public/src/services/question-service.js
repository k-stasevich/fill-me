(function() {
  'use strict';

  angular
    .module('app')
    .service('QuestionService', ['ApiService', function(ApiService) {
      let questions = [];

      this.loadQuestions = function(courseId) {
        return ApiService.request('/api/sec/question?courseId=' + courseId, 'GET')
          .then((questionsFromResponse) => {
            questions = questionsFromResponse;
            return questions;
          });
      };

      this.addQuestion = function(question) {
        return ApiService.request('/api/sec/question', 'POST', question)
          .then((createdQuestion) => {
            questions.push(createdQuestion);
            return questions;
          })
          .catch((err) => Promise.reject(err));
      };

      this.getQuestions = function() {
        return questions;
      };
    }]);
})();