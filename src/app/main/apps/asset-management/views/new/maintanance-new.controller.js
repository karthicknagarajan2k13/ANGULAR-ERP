(function ()
{
    'use strict';   

    angular
        .module('app.asset-management')
        .controller('newMaintananceController', newMaintananceController);

    /** @ngInject */
    function newMaintananceController($mdToast,kbApi, $scope, $document, $state, amApi)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
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
        var vm = this;
        vm.maintanance = {}
        vm.maintanance.asset_id = $state.params.asset_id
        vm.ssName = "s"

        var dataPromise = amApi.get_assets({});
        dataPromise.then(function(result) { 
            $scope.get_assets = result;
        }); 

        vm.saveMaintanance = function(){
            console.log("maintanance",vm.maintanance)
            var dataPromise = amApi.createMaintanance({maintanance:vm.maintanance});
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
                    if( typeof($scope.data.maintanance_schedule_id) !== "undefined"){
                        $state.go('app.asset-management.maintanance-view', {obj:{id: $scope.data.maintanance_schedule_id}}); 
                    }
                }
            }); 
        }
        vm.maintananceDataClear = function(){
            vm.maintanance = {}
        }
        vm.newMaintanancePage = function(){ 
            $state.go('app.asset-management.maintanance-new'); 
        }
        vm.MaintanancePage = function(){
            $state.go('app.asset-management.maintanance'); 
        }
    }
})();