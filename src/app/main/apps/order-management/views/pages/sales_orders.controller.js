(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('SalesOrderController', SalesOrderController);

    /** @ngInject */
    function SalesOrderController($window, omApi, $scope, $state, Statuses, Orders)
    {

        var vm = this;
        vm.dtInstance = {};

        //Data
        console.log("$scope.sales_orders_data")
        vm.search_data = {}
        var dataPromise = omApi.getSalesOrders({});
        dataPromise.then(function(result) { 
            $scope.sales_orders_data = result; 
            console.log("$scope.sales_orders_data",$scope.sales_orders_data)
        }); 

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
		
		// Methods
        vm.searchSalesOrdersData = function(){
            var dataPromise = omApi.getSalesOrders(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.sales_orders_data = result; 
            }); 
        }   
        vm.searchSalesOrdersDataClear = function(){
            vm.search_data = {}
        }
        vm.deleteAllSalesOrder = function () {
            var delete_ids = [];
            angular.forEach($scope.sales_orders_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                omApi.deleteAllSalesOrder({ids: delete_ids})
                $window.location.reload();
            }
        };
        vm.deleteSalesOrder = function (id) {
            var delete_ids = JSON.stringify([id])
            omApi.deleteAllSalesOrder({ids: delete_ids})
            $window.location.reload();
        };
        vm.refreshSalesOrder = function () {
            omApi.refreshSalesOrder().then(function(result){
                var dataPromise = omApi.getSalesOrders({});
                dataPromise.then(function(result) { 
                    $scope.sales_orders_data = result; 
                }); 
            });
        };
        vm.salesOrderView = function(id){
            $state.go('app.order-management.sales-order-view', {obj:{id: id}}); 
        }
        vm.salesOrderEdit = function(id){
            $state.go('app.order-management.sales-order-edit', {obj:{id: id}}); 
        }
        
    }
})();