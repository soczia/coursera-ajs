(function () {
'use strict';

  angular.module('data')
  .controller('MenuDataController', MenuDataController);

  MenuDataController.$inject = ['MenuDataService' , 'items', '$rootScope'];
  function MenuDataController(MenuDataService, items, $rootScope) {
    var mainList = this;
    console.log('items', items);
    mainList.items = items;

    var cancel = $rootScope.$on('$stateChangeError',
    function(event, toState, toParams, fromState, fromParams, error){
      console.log(error);
    });

    mainList.$onDestroy = function () {
      cancel();
    };
  }
})();
