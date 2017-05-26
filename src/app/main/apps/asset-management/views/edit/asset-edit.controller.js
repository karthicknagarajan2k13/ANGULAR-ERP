(function ()
{
    'use strict';

    angular
        .module('app.asset-management')
        .controller('editAssetController', editAssetController);

    /** @ngInject */ 
    function editAssetController($mdToast,kbApi, $scope, $document, $state, amApi)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;
		vm.asset = $state.params.obj
        var last = {
          bottom: false,
          top: true,
          left: false,
          right: true
        };
        function sanitizePosition() {
            var current = $scope.toastPosition;
            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;
            last = angular.extend({},current);
        }
        $scope.toastPosition = angular.extend({},last);
        $scope.getToastPosition = function() {
        sanitizePosition();
        return Object.keys($scope.toastPosition)
          .filter(function(pos) { return $scope.toastPosition[pos]; })
          .join(' ');
        };
        
		vm.ssName = "s"   

        vm.updateAsset = function(){
           var dataPromise = amApi.updateAsset(vm.asset.asset.id,vm.asset);
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    var pinTo = $scope.getToastPosition();
                    $mdToast.show(
                      $mdToast.simple()
                        .textContent($scope.data.message)
                        .position(pinTo )
                        .hideDelay(3000)
                    );
                }else{
                    if( typeof($scope.data.asset_id) !== "undefined"){
                        $state.go('app.asset-management.asset-view', {obj:{id: $scope.data.asset_id}}); 
                    }
                }
            }); 
        }
        vm.viewAssetPage =function(id){
            $state.go('app.asset-management.asset-view', {obj:{id: id}}); 
        }
        vm.newAssetPage = function(){
            $state.go('app.asset-management.asset-new'); 
        }
        vm.AssetPage = function(){
            $state.go('app.asset-management.Asset'); 
        }
    }
})();