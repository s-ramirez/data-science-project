(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope'];
  function MainController($scope) {
    var vm = this;

    angular.extend($scope, {
      center: {
        lat: 35.1938691,
        lng: -82.134658,
        zoom: 4
      }
    })
  }
})();
