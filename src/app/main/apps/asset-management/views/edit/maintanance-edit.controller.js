(function ()
{
    'use strict';

    angular
        .module('app.asset-management')
        .controller('editMaintananceController', editMaintananceController);

    /** @ngInject */ 
    function editMaintananceController($mdToast,kbApi, $scope, $document, $state, amApi)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;
        vm.maintanance_schedule = $state.params.obj
        console.log("vm.maintanance_schedule",vm.maintanance_schedule)

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

        var dataPromise = amApi.get_assets({});
        dataPromise.then(function(result) { 
            $scope.get_assets = result;
        }); 

        vm.updateMaintanance = function(){
           var dataPromise = amApi.updateMaintanance(vm.maintanance_schedule.maintanance.id,vm.maintanance_schedule);
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
        vm.viewMaintanancePage =function(id){
            $state.go('app.asset-management.maintanance-view', {obj:{id: id}}); 
        }
        vm.newMaintanancePage = function(){
            $state.go('app.asset-management.maintanance-new'); 
        }
        vm.MaintanancePage = function(){
            $state.go('app.asset-management.Maintanance'); 
        }
    }
})();