(function() {
  'use strict';

  angular
    .module('app')
    .service('LabService', ['ApiService', function(ApiService) {
      let labs = [];

      this.loadLabs = function(courseId) {
        return ApiService.request('/api/sec/lab/' + courseId, 'GET')
          .then((allLabs) => {
            labs = allLabs;
            return allLabs;
          });
      };

      this.addLab = function(courseId, lab) {
        return ApiService.request('/api/sec/lab', 'POST', {
            courseId: courseId,
            labName: lab.name,
            labNumber: lab.number
          })
          .then((addedLab) => {
            labs.push(addedLab);
            return addedLab;
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      };

      this.getLabs = function() {
        return labs;
      };
    }]);
})();