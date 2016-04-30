(function() {
  'use strict';

  angular
    .module('app')
    .service('ApiService', [
      '$http',
      function($http) {
        let token = '';

        this.request = function(url, method, data) {
          let options = {
            url: url,
            method: method,
            headers: {
              'Content-Type': 'application/json'
            }
          };

          if (token) {
            options.headers['x-token'] = token;
          }

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

        this.isAuthenticated = function() {
          return !!token;
        };

        this.auth = function(data) {
          return this.request('/api/auth', 'POST', data)
            .then((response) => {
              token = response.token;
              return response;
            })
            .catch((err) => Promise.reject(err))
        };

        this.logOut = function() {
          token = '';
        };
      }]);

})();