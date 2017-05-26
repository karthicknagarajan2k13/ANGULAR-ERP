(function ()
{
    'use strict';

    angular
        .module('app.manufacturing')
        .controller('viewMaterialController', viewMaterialController);

    /** @ngInject */
    function viewMaterialController(mfgApi, $scope, $document, $state)
    {
        var vm = this;
        $scope.isOpen = false;
        $scope.demo = {
            isOpen: false,
            count: 0,
            selectedDirection: 'left'
        };
        vm.dtInstance = {};
        vm.dtOptions = {
            bLengthChange  : false,
            paging: false,
            searching: false,
            bInfo: false,
        };
        
        vm.ssName = "s"

        //Api Call
        var dataPromise = mfgApi.viewMaterial($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.material_data = result; 
        }); 

        vm.editMaterialPage = function(material){
             $state.go('app.manufacturing.materials-edit', {obj:{material: material}});
        }
        vm.deleteMaterial = function(id){
            var delete_ids = JSON.stringify([id])
            mfgApi.deleteAllMaterial({ids: delete_ids})
            $state.go('app.manufacturing.materials'); 
        }
        vm.newMaterialPage = function(){
            $state.go('app.manufacturing.materials-new'); 
        }
        vm.MaterialsPage = function(){
            $state.go('app.manufacturing.materials'); 
        }
    }
})();