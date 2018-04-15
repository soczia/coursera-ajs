(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('filteredItems', MenuSearchDirective)
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
        .filter( element => element.description.includes(searchTerm));
       //  var first = foundItems.filter( element => element.description.includes(searchTerm));
        console.log(foundItems);
       //  console.log(first);
       // var first = foundItems.filter( function (item) {
       //  return item.description.includes(searchTerm)
       // });
       //  console.log(first);
       //  var first = foundItems.filter( function (item) {
       //   return item.name.length > 10;
       //  });
       //   console.log(first);
       //  console.log(result);
       //
       //  var desc = foundItems[0].description;
       //  console.log(desc);
       //  console.log(searchTerm);
       //  console.log(desc.toLowerCase().indexOf(searchTerm !== -1));
       return foundItems;
      });

    };
  };

NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var list = this;
    list.searchTerm = "";
    list.filteredItems = "";

    list.found = function (searchTerm) {
        var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
        console.log(promise);
        promise.then(function (response) {
          list.filteredItems = response;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
      };

    list.removeItem = function (itemIndex) {
      console.log("'this' is: ", this);
      this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
      shoppingList.removeItem(itemIndex);
      this.title = origTitle + " (" + list.items.length + " items )";
    };

    // list.found = function (searchTerm)
    // {
    //   var result =  MenuSearchService.getMatchedMenuItems(searchTerm);
    //   console.log(result);
    // };
}

function MenuSearchDirective() {
  var ddo = {
    templateUrl: 'filteredList.html',
    scope: {
      filteredItems: '<',
      // myTitle: '@title',
      onRemove: '&'
    },
    // controller: ShoppingListDirectiveController,
     controllerAs: 'list',
     bindToController: true,
    // link: ShoppingListDirectiveLink
  };

  return ddo;
}


})();
