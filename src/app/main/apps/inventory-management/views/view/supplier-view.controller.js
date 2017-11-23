(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('viewSupplierController', viewSupplierController);

    /** @ngInject */
    function viewSupplierController(imApi, $scope, $document, $state)
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
		

        //Api Call
        var dataPromise = imApi.viewSupplier($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.supplier_data = result;
        }); 

        vm.editSupplierPage = function(id){
             $state.go('app.inventory-management.suppliers-edit', {obj:{id: id}});
        }
        vm.deleteSupplier = function(id){
            var delete_ids = JSON.stringify([id])
            imApi.deleteAllSupplier({ids: delete_ids})
            $state.go('app.inventory-management.suppliers'); 
        }
        vm.newPurchaseOrderPage = function(){
            $state.go('app.inventory-management.purchase-orders-new',{supplier_id: $scope.supplier_data.id}); 
        }
        vm.editPurchaseOrderPage = function(id){
             $state.go('app.inventory-management.purchase-orders-edit', {obj:{id: id}});
        }
        vm.viewPurchaseOrderPage = function(id){
            $state.go('app.inventory-management.purchase-orders-view', {obj:{id: id}}); 
        }
        vm.deleteAllPurchaseOrder = function () {
            var delete_ids = [];
            angular.forEach($scope.supplier_data.purchase_orders, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise =  imApi.deleteAllPurchaseOrder({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = imApi.viewSupplier($state.params.obj.id);
                    dataPromise.then(function(result) { 
                        $scope.supplier_data = result;
                    });
                });
            }
        };
        vm.deletePurchaseOrder = function (id) {
            var delete_ids = JSON.stringify([id])
            imApi.deleteAllPurchaseOrder({ids: delete_ids})
            $window.location.reload();
        };
        vm.newSupplierPage = function(){
            $state.go('app.inventory-management.suppliers-new'); 
        }
		vm.ssName = "s"
        vm.SuppliersPage = function(){
            $state.go('app.inventory-management.suppliers'); 
        }
    }
})();