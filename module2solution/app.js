(function () {
'use.strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var wishList = this;

  wishList.items = ShoppingListCheckOffService.getWishingItems();

  wishList.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  }

  console.log(wishList.items);
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService, $scope) {
  var boughtList = this;

  boughtList.items = ShoppingListCheckOffService.getBoughtItems();
  console.log(boughtList);
}

function ShoppingListCheckOffService() {
  var service = this;

  var wishedItems = [
    {
      name: "Cookies",
      quantity: 10
    },
    {
      name: "Donuts",
      quantity: 5
    },
    {
      name: "Carrots",
      quantity: 3
    },
    {
      name: "Pie",
      quantity: 1
    },
    {
      name: "Bootles of Coke",
      quantity: 8
    }
  ];
  var boughtItems = [];

  service.buyItem = function (itemIndex) {
    var item = wishedItems[itemIndex];
    wishedItems.splice(itemIndex, 1);
    boughtItems.push(item);
  }

  service.getWishingItems = function () {
    return wishedItems;
  }

  service.getBoughtItems = function () {
    return boughtItems;
  }
}

})();
