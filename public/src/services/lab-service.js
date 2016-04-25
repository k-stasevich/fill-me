(function() {
  'use strict';

  angular
    .module('app')
    .service('LabService', ['ApiService', function(ApiService) {
      let labs = [];

      this.loadLabs = function(courseId) {
        return ApiService.request('/api/sec/lab?courseId=' + courseId, 'GET')
          .then((allLabs) => {
            labs = allLabs;
            return allLabs;
          });
      };

      this.addLab = function(courseId, lab) {
        return ApiService.request('/api/sec/lab', 'POST', {
            courseId: courseId,
            name: lab.name,
            number: lab.number
          })
          .then((addedLab) => {
            labs.push(addedLab);
            return addedLab;
          })
          .catch((err) => Promise.reject(err));
      };

      this.updateLab = function(courseId, lab) {
        return ApiService.request('/api/sec/lab', 'PUT', {
            courseId: courseId,
            labId: lab.labId,
            name: lab.name,
            number: lab.number
          })
          .then(() => {
            const selectedLabIndex = labs.findIndex((item) => item.labId === lab.labId);
            labs[selectedLabIndex] = lab;
            return labs;
          })
          .catch((err) => Promise.reject(err));
      };

      this.deleteLab = function(labId) {
        return ApiService.request('/api/sec/lab/' + labId, 'DELETE')
          .then(() => {
            const index = labs.findIndex((item) => item.labId === labId);
            labs.splice(index, 1);
            return labs;
          })
          .catch((err) => {
            return Promise.reject(err)
          });
      };

      this.getLabs = function() {
        return labs;
      };
    }]);
})();