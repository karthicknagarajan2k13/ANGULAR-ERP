(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('viewWarehouseLocationController', viewWarehouseLocationController);

    /** @ngInject */
    function viewWarehouseLocationController(whApi, $scope, $document, $state)
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
		

        vm.warehouse_location_item_data = {}

        var dataPromise = whApi.get_items({});
        dataPromise.then(function(result) { 
            $scope.get_items = result;
        }); 

        vm.changedItemValue = function(item){
            var item = angular.fromJson(item)
            vm.warehouse_location_item_data.item_in_stock = item.item_in_stock
            vm.warehouse_location_item_data.item_id = item.items_id
        }

        vm.addItemWarehouseLocation = function(){
            var dataPromise = whApi.addItemWarehouseLocation({warehouse_location_item:vm.warehouse_location_item_data});
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.warehouse_location_item_id) !== "undefined"){
                        var dataPromise = whApi.viewWarehouseLocation($state.params.obj.id);
                        dataPromise.then(function(result) { 
                            $scope.warehouse_location_data = result;
                            vm.warehouse_location_item_data.warehouse_location_id = $scope.warehouse_location_data.id 
                        });                    
                    }
                }
            }); 
        }
        vm.LocationsPage = function(){
            $state.go('app.warehouse-management.stock-locations'); 
        }

        //Api Call
        var dataPromise = whApi.viewWarehouseLocation($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.warehouse_location_data = result;
            vm.warehouse_location_item_data.warehouse_location_id = $scope.warehouse_location_data.id 
        }); 

        vm.editWarehouseLocationPage = function(warehouse_location){
             $state.go('app.warehouse-management.stock-locations-edit', {obj:{warehouse_location: warehouse_location}});
        }
        vm.deleteWarehouseLocation = function(id){
            var delete_ids = JSON.stringify([id])
            whApi.deleteAllWarehouseLocation({ids: delete_ids})
            $state.go('app.warehouse-management.stock-locations'); 
        }
        vm.newWarehouseLocationPage = function(){
            $state.go('app.warehouse-management.stock-locations-new'); 
        }
        vm.deleteItem = function(id){
            var delete_id = id
            whApi.deleteWarehouseLocationItem({location_item_id: delete_id})
            $state.go('app.warehouse-management.stock-locations'); 
        }
       

		vm.ssName = "s"
		
    }
})();