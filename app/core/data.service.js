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

    return {
      getClusterData: getClusterData
    }
  }
})();
