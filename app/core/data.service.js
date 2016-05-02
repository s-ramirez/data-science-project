(function() {
  'use strict';

  angular
    .module('app')
    .service('DataService', DataService);

  DataService.$inject = ['$http'];

  function DataService($http) {

    function getClusterData() {
      return $http.get('data/clusters.json').then(function (response) {
        return response.data;
      });
    }

    function getIcons() {
      var icons = {};
      var opt = ['a','b','c','d', 'e', 'f', 'g', 'h','i','j','k','l','m','n','o','p','q','r','s']
      for(var i = 0; i < opt.length-1; i++){
        for(var j = i; j < opt.length; j++) {
          var className = opt[i]+opt[j];
          icons[className] = {
            type: 'div',
            iconSize: [10, 10],
            className: className,
            iconAnchor:  [5, 5]
          };
        }
      }
      return icons;
    }

    return {
      getClusterData: getClusterData,
      getIcons: getIcons
    }
  }
})();
