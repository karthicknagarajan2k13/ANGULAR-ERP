(function ()
{
    'use strict';

    angular
        .module('app.manufacturing')
        .controller('viewManufacturingController', viewManufacturingController);

    /** @ngInject */
    function viewManufacturingController(mfgApi, $scope, $document, $state)
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

        vm.manufacturing_material_data = {}

        var dataPromise = mfgApi.get_materials({});
        dataPromise.then(function(result) { 
            $scope.get_materials = result;
        }); 

        vm.changedMaterialValue = function(material){
            var material = angular.fromJson(material)
            console.log("changedItemValue",material)
            vm.manufacturing_material_data.unit_price = material.unit
            vm.manufacturing_material_data.quantity = material.quantity
            vm.manufacturing_material_data.total = material.unit * vm.manufacturing_material_data.quantity
            vm.manufacturing_material_data.material_id = material.material_id
            console.log(vm.manufacturing_material_data)
        }

        vm.calculate_total = function(){
            console.log("calculate_total")
            vm.manufacturing_material_data.total = vm.manufacturing_material_data.unit_price * vm.manufacturing_material_data.quantity
            console.log(vm.manufacturing_material_data)
        }

        vm.addManufacturingMaterial = function(){
            console.log("vm.manufacturing_material_data",vm.manufacturing_material_data)
            var dataPromise = mfgApi.addManufacturingMaterial({manufacturing_material:vm.manufacturing_material_data});
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.manufacturing_material_id) !== "undefined"){
                        var dataPromise = mfgApi.viewManufacturing($state.params.obj.id);
                        dataPromise.then(function(result) { 
                            $scope.manufacturing_data = result;
                            vm.manufacturing_material_data.manufacturing_id = $scope.manufacturing_data.id
                        });                      
                    }
                }
            }); 
        }

        //Api Call
        var dataPromise = mfgApi.viewManufacturing($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.manufacturing_data = result;
            vm.manufacturing_material_data.manufacturing_id = $scope.manufacturing_data.id
        }); 

        vm.editManufacturingPage = function(manufacturing){
             $state.go('app.manufacturing.manufacturing-edit', {obj:{manufacturing: manufacturing}});
        }
        vm.deleteManufacturing = function(id){
            var delete_ids = JSON.stringify([id])
            mfgApi.deleteAllManufacturing({ids: delete_ids})
            $state.go('app.manufacturing.manufacturing'); 
        }
        vm.newManufacturingPage = function(){
            $state.go('app.manufacturing.manufacturing-new'); 
        }


        vm.newMaterialPage = function(){
            $state.go('app.manufacturing.materials-new'); 
        }
        vm.viewMaterialPage = function(id){
            $state.go('app.manufacturing.materials-view', {obj:{id: id}}); 
        }
        vm.deleteAllMaterial = function () {
            var delete_ids = [];
            angular.forEach($scope.manufacturing_data.materials, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = mfgApi.deleteAllMaterial({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = mfgApi.viewManufacturing($state.params.obj.id);
                    dataPromise.then(function(result) { 
                        $scope.manufacturing_data = result; 
                    });  
                });
            }
        };
        vm.ManufacturingsPage = function(){
            $state.go('app.manufacturing.manufacturing'); 
        }
    }
})();