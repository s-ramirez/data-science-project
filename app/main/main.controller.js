(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope', 'DataService'];
  function MainController($scope, DataService) {
    var vm = this;
    var icons = DataService.getIcons();
    var classes = ["aa","ab","ac","ad","ae","af","ag","ah","ai","aj","ak","al","am","an","ao","ap","aq","ar","as","bb","bc","bd","be","bf","bg","bh","bi","bj","bk","bl","bm","bn","bo","bp","bq","br","bs","cc","cd","ce","cf","cg","ch","ci","cj","ck","cl","cm","cn","co","cp","cq","cr","cs","dd","de","df","dg","dh","di","dj","dk","dl","dm","dn","do","dp","dq","dr","ds","ee","ef","eg","eh","ei","ej","ek","el","em","en","eo","ep","eq","er","es","ff","fg","fh","fi","fj","fk","fl","fm","fn","fo","fp","fq","fr","fs","gg","gh","gi","gj","gk","gl","gm","gn","go","gp","gq","gr","gs","hh","hi","hj","hk","hl","hm","hn","ho","hp","hq","hr","hs","ii","ij","ik","il","im","in","io","ip","iq","ir","is","jj","jk","jl","jm","jn","jo","jp","jq","jr","js","kk","kl","km","kn","ko","kp","kq","kr","ks","ll","lm","ln","lo","lp","lq","lr","ls","mm","mn","mo","mp","mq","mr","ms","nn","no","np","nq","nr","ns","oo","op","oq","or","os","pp","pq","pr","ps","qq","qr","qs","rr","rs"];
    vm.algorithms = [{name: 'Affinity Propagation', key: 'AffinityPropagation'}, {name: 'Average Linkage', key: 'Average Linkage'}, {name: 'Complete Linkage', key: 'Complete linkage'}, {name: 'DBSCAN', key: 'DBSCAN'}, {name: 'KMeans', key: 'KMeans'}, {name: 'Spectral Clustering', key: 'SpectralClustering'}, {name: 'Ward Linkage', key: 'Ward linkage'}];
    vm.active = vm.algorithms[0];

    vm.center = {
        lat: 35.2030728,
        lng: -80.9796101,
        zoom: 10
    };

    vm.markers = {};

    vm.layers = {
      baselayers: {
        openStreetMap: {
          name: 'OpenStreetMap',
          type: 'xyz',
          url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        }
      },
      overlays: {
      }
    };

    vm.showClusters = function() {
      vm.markers = {}
      for(var i = 0; i < 500; i++){
        var value = vm.clusters[i];
        value.name = value.name.replace(/-/g, "");
        for(var j = 0; j < vm.algorithms.length; j++){
          vm.markers[vm.algorithms[j].key+value.name] = {
            layer: vm.algorithms[j].key,
            lat: value.latitude,
            lng: value.longitude,
            icon: icons[classes[value[vm.algorithms[j].key]%classes.length]]
          };
        }
      }
    };

    vm.init = function(){
      for(var i = 0; i < vm.algorithms.length; i++){
        vm.layers.overlays[vm.algorithms[i].key] = {
          type: 'group',
          name: vm.algorithms[i].name,
          visible: (i == 0) ? true : false
        };
      }
      DataService.getClusterData().then(function(clusters){
        vm.clusters = clusters;
        vm.showClusters();
      });
    };

    vm.setActive = function(item, event) {
      event.preventDefault();
      vm.active = item;
      for(var key in vm.layers.overlays) {
        vm.layers.overlays[key].visible = false;
      }
      vm.layers.overlays[item.key].visible = true;
    }

    vm.init();
  }
})();
