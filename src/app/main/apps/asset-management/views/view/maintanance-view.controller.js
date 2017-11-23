(function ()
{
    'use strict';

    angular
        .module('app.asset-management')
        .controller('viewMaintananceController', viewMaintananceController);

    /** @ngInject */
    function viewMaintananceController(kbApi, $scope, $document, $state, amApi)
    {

        $scope.isOpen = false;
        $scope.demo = {  
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;
        vm.ssName = "s"

        //Api Call
        var dataPromise = amApi.viewMaintanance($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.maintanance_data = result;
        }); 

        vm.editMaintanancePage = function(maintanance){
             $state.go('app.asset-management.maintanance-edit', {obj:{maintanance: maintanance}});
        }
        vm.deleteAllMaintanance = function(id){
            var delete_ids = JSON.stringify([id])
            amApi.deleteAllMaintanance({ids: delete_ids})
            $state.go('app.asset-management.maintanance'); 
        }
        vm.newMaintanancePage = function(){
            $state.go('app.asset-management.maintanance-new'); 
        }
        vm.MaintanancePage = function(){
            $state.go('app.asset-management.maintanance'); 
        }	
    }
})();