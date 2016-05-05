(function() {
  'use strict';

  angular
    .module('app')
    .controller('DeleteLabPopupCtrl', function($scope, $uibModalInstance, onSuccess) {


      $scope.ok = function() {
        return onSuccess()
          .then(() => {
            $uibModalInstance.close()
          });
      };

      $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
      };
    });
})();
