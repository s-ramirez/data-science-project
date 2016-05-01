(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope', 'DataService'];
  function MainController($scope, DataService) {
    var vm = this;

    vm.center = {
        lat: 35.1938691,
        lng: -82.134658,
        zoom: 10
    };

    vm.init = function(){
      DataService.getClusterData().then(function(clusters){
        vm.clusters = clusters;
        angular.forEach(vm.clusters, function(value){

        });
      });
    };

    vm.algorithms = [{name: 'Affinity Propagation', key: 'AffinityPropagation'}, {name: 'Average Linkage', key: 'Average Linkage'}];
    vm.active = vm.algorithms[0];

    vm.init();
  }
})();
