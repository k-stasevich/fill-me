(function() {
  'use strict';

  angular
    .module('app')
    .service('urlFormatterHelper', [function() {
      this.formUrl = function(url, params) {
        let formattedUrl = url;

        if (params && params.length) {
          formattedUrl += '?';
        }

        params.forEach((item) => {
          formattedUrl += item.param + '=' + item.value + '&';
        });

        return formattedUrl;
      };
    }]);
})();