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
    vm.geojson = [];
    vm.showClusters = function() {
      angular.forEach(vm.clusters, function(value){
        vm.geojson.push({
          type: "Feature",
          properties: {
            name: value.name,
            show_on_map: true
          },
          geometry: {
            type: "Point",
            coordinates: [value.latitude, value.longitude]
          }
        });
      });
    };

    vm.init = function(){
      DataService.getClusterData().then(function(clusters){
        vm.clusters = clusters;
        vm.showClusters();
      });
    };

    vm.algorithms = [{name: 'Affinity Propagation', key: 'AffinityPropagation'}, {name: 'Average Linkage', key: 'Average Linkage'}];
    vm.active = vm.algorithms[0];

    vm.init();
  }
})();
