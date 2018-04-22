(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to tab 1 if no other URL matches
  $urlRouterProvider.otherwise('/home');

  // Set up UI states
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'src/templates/home.template.html'
    })

    .state('categories', {
      url: '/categories',
      templateUrl: 'src/templates/main-categories.template.html',
      controller: 'MenuDataController as mainList',
      resolve: {
        items: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    .state('category', {
      url: '/category/{category}',
      templateUrl: 'src/templates/category.template.html',
      params: {
        category: null
      },
      controller: 'MenuDataController as detailedList',
      resolve: {
        items: ['$stateParams', 'MenuDataService', function ($stateParams,MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.category);
        }]
      }
    });
}


})();
