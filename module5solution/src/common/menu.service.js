(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath','$q'];
function MenuService($http, ApiPath, $q) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.dishExists = function (dish) {
    return $http.get(ApiPath + '/menu_items/'+ dish +'.json').then(function (response) {
      return response.data;
    })
    .catch(function (response) {
      console.log(response);
      return $q.reject(response);
    });
  };

}



})();
