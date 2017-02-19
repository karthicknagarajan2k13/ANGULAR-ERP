(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('purchaseOrdersController', purchaseOrdersController);

    /** @ngInject */
    function purchaseOrdersController($window, imApi, $scope, $state, Statuses, Orders)
    {

        var vm = this;

        // Data
        vm.search_data = {}
        var dataPromise = imApi.getPurchaseOrders({});
        dataPromise.then(function(result) { 
            $scope.purchase_orders_data = result;
            console.log("$scope.purchase_orders_data",$scope.purchase_orders_data)
        }); 
        var dataPromise = imApi.get_suppliers({});
        dataPromise.then(function(result) { 
            $scope.get_suppliers = result;
        }); 
        var dataPromise = imApi.getUsers({});
        dataPromise.then(function(result) { 
            $scope.get_users = result;
        }); 


        vm.orders = Orders.data;
        vm.statuses = Statuses.data;
        vm.dtInstance = {};
        vm.dtOptions = {
            dom         : 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            columnDefs  : [
                {
                    // Target the id column
                    targets: 0,
                    width  : '10px'
                }
            ],
            initComplete: function ()
            {
                var api = this.api(),
                    searchBox = angular.element('body').find('#e-commerce-products-search');

                // Bind an external input as a table wide search box
                if ( searchBox.length > 0 )
                {
                    searchBox.on('keyup', function (event)
                    {
                        api.search(event.target.value).draw();
                    });
                }
            },
            pagingType  : 'simple',
            lengthMenu  : [10, 20, 30, 50, 100],
            pageLength  : 20,
            scrollY     : 'auto',
            responsive  : true
        };


        vm.newPurchaseOrderPage = function(){
            $state.go('app.inventory-management.purchase-orders-new'); 
        }
        vm.editPurchaseOrderPage = function(id){
             $state.go('app.inventory-management.purchase-orders-edit', {obj:{id: id}});
        }
        vm.viewPurchaseOrderPage = function(id){
            $state.go('app.inventory-management.purchase-orders-view', {obj:{id: id}}); 
        }
        vm.deleteAllPurchaseOrder = function () {
            var delete_ids = [];
            angular.forEach($scope.purchase_orders_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = imApi.deleteAllPurchaseOrder({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = imApi.getPurchaseOrders({});
                    dataPromise.then(function(result) { 
                        $scope.purchase_orders_data = result;
                    }); 
                });
            }
        };
        vm.deletePurchaseOrder = function (id) {
            var delete_ids = JSON.stringify([id])
            imApi.deleteAllPurchaseOrder({ids: delete_ids})
            $window.location.reload();
        };
        vm.searchPurchaseOrderData = function(id){
            console.log("vm.search_data",vm.search_data)
            var dataPromise = imApi.getPurchaseOrders(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.purchase_orders_data = result; 
            }); 
        }
        vm.searchPurchaseOrderDataClear = function(id){
            vm.search_data = {}
        }
	
    }
})();