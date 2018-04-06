(function () {
'use.strict';

angular.module('ReasonableLunchCheckerApp', [])
.controller('ReasonableLunchCheckekController', LunchChecker);

LunchChecker.$inject = ['$scope'];
function LunchChecker($scope) {
  $scope.menu = "";
  $scope.message = "";
  $scope.emptyInfo = ""
  $scope.in = "";
  $scope.checkLunch = function () {
    var myarray = $scope.menu.split(',');
    console.log(myarray);
    if ($scope.menu == "" || $scope.menu.split(',').map(item => item.trim())
    .filter(Boolean).length == 0)
    {
      $scope.message = "Please enter data first";
      $scope.emptyInfo = ""
      $scope.in = '';

    if ($scope.menu != "") {
        $scope.emptyInfo = "It do NOT consider and empty item, as an item towards to the count";
    }
  }
    else if (myarray
    .map(item => item.trim())
    .filter(Boolean).length > 3)
    {
      $scope.message = "Too much!";
      $scope.emptyInfo = ""
      $scope.in = 'false';
    }
    else {
      $scope.message = "Enjoy!";
      $scope.in = true;
      if (myarray.length > myarray
      .map(item => item.trim())
      .filter(Boolean).length)
      $scope.emptyInfo = "It do NOT consider and empty item, as an item towards to the count";
      else {
        $scope.emptyInfo = "";
      }
    }
  }
}

})();
