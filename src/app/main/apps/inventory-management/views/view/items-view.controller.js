(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('viewItemController', viewItemController);

    /** @ngInject */
    function viewItemController(imApi, $scope, $mdDialog, $document, $state)
    {
        /*$window.localStorage.setItem('current_user',JSON.stringify($scope.user));*/
        
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
		
		

        //Api Call
        var dataPromise = imApi.viewItem($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.item_data = result; 
        }); 

        vm.editItemPage = function(item){
             $state.go('app.inventory-management.items-edit', {obj:{item: item}});
        }
        vm.deleteItem = function(id){
            var delete_ids = JSON.stringify([id])
            imApi.deleteAllItem({ids: delete_ids})
            $state.go('app.inventory-management.items'); 
        }
        vm.newPurchaseOrderPage = function(){
            $state.go('app.inventory-management.purchase-orders-new'); 
        }
        vm.viewPurchaseOrderPage = function(id){
            $state.go('app.inventory-management.purchase-orders-view', {obj:{id: id}}); 
        }
        vm.deleteAllPurchaseOrder = function () {
            var delete_ids = [];
            angular.forEach($scope.item_data.purchase_orders, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = imApi.deleteAllPurchaseOrder({ids: delete_ids})
                dataPromise.then(function(result) {
                    var dataPromise = imApi.viewItem($state.params.obj.id);
                    dataPromise.then(function(result) { 
                        $scope.item_data = result; 
                    }); 
                }); 
            }
        }
        vm.newItemPage = function(){
            $state.go('app.inventory-management.items-new'); 
        }
        vm.ItemsPage = function(){
            $state.go('app.inventory-management.items'); 
        }
        
		vm.ssName = "s"

        vm.newWarehouseLocationPage = function(){
            $state.go('app.warehouse-management.stock-locations-new'); 
        }
        vm.viewWarehouseLocationPage = function(id){
            $state.go('app.warehouse-management.stock-locations-view', {obj:{id: id}}); 
        }
        vm.deleteAllWarehouseLocation = function () {
            var delete_ids = [];
            angular.forEach($scope.item_data.warehouse_locations, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = imApi.deleteAllWarehouseLocation({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = imApi.viewItem($state.params.obj.id);
                    dataPromise.then(function(result) { 
                        $scope.item_data = result; 
                    }); 
                });
            }
        };
    }
})();