(function () {
'use strict';

angular.module('data')
.component('items', {
  templateUrl: 'src/templates/categories.details.template.html',
  bindings: {
    items: '<'
  }
});

})();
