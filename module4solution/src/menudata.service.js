(function () {
'use strict';

  angular.module('data')
  .service('MenuDataService',MenuDataService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

  MenuDataService.$inject = ['$http', 'ApiBasePath'];
  function MenuDataService($http, ApiBasePath)
  {
    var service = this;

    service.getAllCategories = function () {
      return $http({
          method: "GET",
          url: (ApiBasePath + "/categories.json"),
        }).then( function (result) {
          console.log(result);
          var foundItems = result.data;
          return foundItems;
        })
        .catch(function (error) {
          console.log(error);
        });

      };

    service.getItemsForCategory = function (categoryShortName) {
      return $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items.json"),
          params: {
                  category: categoryShortName
          }
        }).then( function (result) {
          var foundItems = result.data;
          console.log(result);
          console.log(foundItems);
          // .filter( element => element.description.toLowerCase().includes(searchTerm.toLowerCase()));
         return foundItems;
        });

      };

    }

})();
