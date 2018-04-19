(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', MenuSearchDirective)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath)
  {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
    return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
      }).then( function (result) {
        var foundItems = result.data.menu_items
        .filter( element => element.description.toLowerCase().includes(searchTerm.toLowerCase()));

       return foundItems;
      });

    };

  };

NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var list = this;
    list.searchTerm = "";
    list.foundItems = "";

    list.found = function (searchTerm) {
        if (searchTerm.trim().length > 0 )
        {
        var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

        promise.then(function (response) {
          list.foundItems = response;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        }
        else {
          list.foundItems = "";
        }
      };

    list.removeItem = function (itemIndex) {
      console.log("'this' is: ", this);
      list.foundItems.splice(itemIndex, 1);
    };

}

function MenuSearchDirective() {
  var ddo = {
    templateUrl: 'filteredList.html',
    scope: {
      filteredItems: '<',
      onRemove: '&'
    },
   controller: MenuSearchDirectiveController,
   controllerAs: 'list',
//   transclude: true,
   bindToController: true
  };

  return ddo;
}

function MenuSearchDirectiveController() {
  var list = this;
}


})();
