'use strict';

(function () {
  'use strict';

  var loaderHtml = '<div class="windows8"> ' + '<div class="wBall" id="wBall_1">' + '<div class="wInnerBall"></div>' + '</div>' + '<div class="wBall" id="wBall_2">' + '<div class="wInnerBall"></div>' + '</div>' + '<div class="wBall" id="wBall_3">' + '<div class="wInnerBall"></div>' + '</div>' + '<div class="wBall" id="wBall_4">' + '<div class="wInnerBall"></div>' + '</div>' + '<div class="wBall" id="wBall_5">' + '<div class="wInnerBall"></div>' + '</div> ' + '</div>';

  var foo = '<h1>Loaded</h1>';

  angular.module('app').directive('loader', ['$compile', function ($compile) {
    return {
      restrict: 'E',
      link: function link(scope, element, attrs) {

        scope.$watch(function () {
          return attrs.isloaded;
        }, function (value) {
          console.log(value);
          if (value) {
            element.html(foo);
            $compile(element.contents())(scope);
          } else {
            element.html(loaderHtml);
            $compile(element.contents())(scope);
          }
        });
      }
    };
  }]);
})();