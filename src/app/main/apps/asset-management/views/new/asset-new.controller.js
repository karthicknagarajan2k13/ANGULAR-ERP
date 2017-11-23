(function ()
{
    'use strict';

    angular
        .module('app.asset-management')
        .controller('newAssetController', newAssetController);

    /** @ngInject */
    function newAssetController($mdToast,kbApi, $scope, $document, $state, amApi)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };

        var vm = this;
        vm.asset = $state.params.obj
		vm.ssName = "s"
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

        vm.saveAsset = function(){
            console.log("asset",vm.asset)
            var dataPromise = amApi.createAsset({asset:vm.asset});
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
        vm.AssetDataClear = function(){
            vm.asset = {}
        }
        vm.newAssetPage = function(){ 
            $state.go('app.asset-management.asset-new'); 
        }
        vm.AssetPage = function(){
            $state.go('app.asset-management.asset'); 
        }
    }
})();