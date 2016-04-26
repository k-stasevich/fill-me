(function() {
  'use strict';

  angular
    .module('app')
    .service('LogService', ['ApiService', function(ApiService) {
      let log = [];

      this.loadLog = function() {
        return ApiService.request('api/sec/log', 'GET')
          .then((logFromResponse) => {
            log = logFromResponse;
            return log;
          });
      }
    }]);
})();