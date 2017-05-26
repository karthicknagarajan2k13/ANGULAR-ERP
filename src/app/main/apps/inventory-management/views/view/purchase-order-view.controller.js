(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('viewPurchaseOrderController', viewPurchaseOrderController);

    /** @ngInject */
    function viewPurchaseOrderController(imApi, $scope, $document, $state)
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
        
        vm.purchase_order_item_data = {}

        //Api Call
        var dataPromise = imApi.viewPurchaseOrder($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.purchase_order_data = result; 
            vm.purchase_order_item_data.purchase_order_id = $scope.purchase_order_data.id 
        }); 


        var dataPromise = imApi.get_items({});
        dataPromise.then(function(result) { 
            $scope.get_items = result;
        }); 

        vm.changedItemValue = function(item){
            var item = angular.fromJson(item)
            console.log("changedItemValue",item)
            vm.purchase_order_item_data.unit_price = item.unit
            vm.purchase_order_item_data.total = item.unit * vm.purchase_order_item_data.quantity
            vm.purchase_order_item_data.item_id = item.items_id
            console.log(vm.purchase_order_item_data)
        }
        vm.calculate_total = function(){
            console.log("calculate_total")
            vm.purchase_order_item_data.total = vm.purchase_order_item_data.unit_price * vm.purchase_order_item_data.quantity
            console.log(vm.purchase_order_item_data)
        }
        vm.addItemPurchaseOrder = function(){
            var dataPromise = imApi.addItemPurchaseOrder({purchase_order_item:vm.purchase_order_item_data});
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.item_purchase_order_id) !== "undefined"){
                        var dataPromise = imApi.viewPurchaseOrder($state.params.obj.id);
                        dataPromise.then(function(result) { 
                            $scope.purchase_order_data = result; 
                            vm.purchase_order_item_data.purchase_order_id = $scope.purchase_order_data.id 
                        });                     
                    }
                }
            }); 
        }

        vm.editPurchaseOrderPage = function(id){
             $state.go('app.inventory-management.purchase-orders-edit', {obj:{id: id}});
        }
        vm.deletePurchaseOrder = function(id){
            var delete_ids = JSON.stringify([id])
            imApi.deleteAllPurchaseOrder({ids: delete_ids})
            $state.go('app.inventory-management.purchase-orders'); 
        }
		vm.ssName = "s"
        vm.newPurchaseOrderPage = function(){
            $state.go('app.inventory-management.purchase-orders-new'); 
        }
        vm.PurchaseOrdersPage = function(){
            $state.go('app.inventory-management.purchase-orders'); 
        }
    }
})();