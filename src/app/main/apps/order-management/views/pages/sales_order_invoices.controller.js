(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('SalesOrderInvoicesController', SalesOrderInvoicesController);

    /** @ngInject */
    function SalesOrderInvoicesController($window, omApi, $scope, $state)
    {

        
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
        $scope.show_table1 = false
        $scope.show_table2 = false

		var vm = this;

        //Data
        vm.search_data = {}
        var dataPromise = omApi.getSalesOrderInvoices({});
        dataPromise.then(function(result) { 
            $scope.sales_order_invoices_data = result;  
            $scope.show_table2 = true
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
                initComplete: initComplete,
                pagingType  : 'simple',
                lengthMenu  : [10, 20, 30, 50, 100],
                pageLength  : 20,
                scrollY     : 'auto',
                responsive  : true
            };
            
        }); 



        function initComplete(){
            $scope.show_table1 = true
        }
        
		// Methods
        vm.searchSalesOrderInvoicesData = function(){
            var dataPromise = omApi.getSalesOrderInvoices(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.sales_order_invoices_data = result; 
            }); 
        }   
        vm.searchSalesOrderInvoicesDataClear = function(){
            vm.search_data = {}
        }
        vm.deleteAllSalesOrderInvoice = function () {
            var delete_ids = [];
            angular.forEach($scope.sales_order_invoices_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = omApi.deleteAllSalesOrderInvoice({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = omApi.getSalesOrderInvoices({});
                    dataPromise.then(function(result) { 
                        $scope.sales_order_invoices_data = result;
                    }); 
                });
            }
        };
        vm.deleteSalesOrderInvoice = function (id) {
            var delete_ids = JSON.stringify([id])
            omApi.deleteAllSalesOrderInvoice({ids: delete_ids})
            $window.location.reload();
        };
        vm.salesOrderView = function(id){
            $state.go('app.order-management.invoices-view', {obj:{id: id}}); 
        }
        vm.newSalesOrderInvoice = function(){
            $state.go('app.order-management.invoices-new'); 
        }
        vm.editInvoice = function(id){
            $state.go('app.order-management.invoices-edit', {obj:{id: id}}); 
        }


    }
})();