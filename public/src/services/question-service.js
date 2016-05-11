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

      this.deleteQuestion = function(questionId) {
        return ApiService.request('/api/sec/question/' + questionId, 'DELETE')
          .then((deletedId) => {
            const index = questions.findIndex((item) => item.questionId === questionId);
            questions.splice(index, 1);
            return questions;
          })
          .catch((err) => Promise.reject(err));
      };

      this.getQuestions = function() {
        return questions;
      };
    }]);
})();