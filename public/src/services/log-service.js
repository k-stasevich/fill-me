(function() {
  'use strict';

  angular
    .module('app')
    .service('LogService', ['ApiService', 'urlFormatterHelper', function(ApiService, urlFormatterHelper) {
      let log = [];

      this.loadLog = function(student, date) {
        let params = [];

        if (student) {
          params.push({ param: 'student', value: student });
        }

        if (date) {
          params.push({ param: 'date', value: moment(date).format('MM-DD-YYYY')});
        }

        const url = urlFormatterHelper.formUrl('api/sec/log', params);

        return ApiService.request(url, 'GET')
          .then((logFromResponse) => {
            log = logFromResponse;
            return log;
          });
      };

      this.getLog = function() {
        return log;
      };
    }]);
})();