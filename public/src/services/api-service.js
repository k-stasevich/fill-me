(function() {
  'use strict';

  angular
    .module('app')
    .service('ApiService', [
      '$http',
      function($http) {
        this.request = function(url, method, data) {
          let options = {
            url: url,
            method: method,
            headers: {
              'Content-Type': 'application/json'
            }
          };

          if (data) {
            options.data = data;
          }

          return new Promise((resolve, reject) => {
            $http(options)
              .then(
                (response) => resolve(response.data),
                (error) => reject(error)
              );
          });
        };
      }]);

})();