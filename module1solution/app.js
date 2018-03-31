(function () {
'use.strict';

angular.module('ReasonableLunchCheckerApp', [])
.controller('ReasonableLunchCheckekController', LunchChecker);

LunchChecker.$inject = ['$scope'];
function LunchChecker($scope) {
  $scope.menu = "";
  $scope.message = "";

  $scope.checkLunch = function () {
    if ($scope.menu == "")
    {
      $scope.message = "Please enter data first";
    }
    else if ($scope.menu.split(',')
    .map(item => item.trim())
    .filter(Boolean).length > 3)
    {
      $scope.message = "Too much!";
    }
    else {
      $scope.message = "Enjoy!";
    }
  }
}

})();
