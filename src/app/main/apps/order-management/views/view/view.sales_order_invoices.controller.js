(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('viewSalesOrderInvoiceController', viewSalesOrderInvoiceController);

    /** @ngInject */
    function viewSalesOrderInvoiceController($scope, omApi, $document, $state)
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
        var dataPromise = omApi.viewSalesOrderInvoice($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.sales_order_invoice_data = result;

            var total_quantity = 0;
            var total_price = 0;
            angular.forEach($scope.sales_order_invoice_data.items, function(value, key) {
              total_quantity += value.quantity ;
              total_price += (value.quantity * value.item_price);
            });
            $scope.sales_order_invoice_data.total_quantity = total_quantity;
            $scope.sales_order_invoice_data.total_price = total_price;
        }); 
	
        vm.deleteSalesOrderInvoice = function (id) {
            var delete_ids = JSON.stringify([id])
            omApi.deleteAllSalesOrderInvoice({ids: delete_ids})
            $state.go('app.order-management.invoices')
        };
        vm.editSalesOrderInvoice = function(id){
             $state.go('app.order-management.invoices-edit', {obj:{id: id}});
        }
        vm.newSalesOrderInvoice = function(){
            $state.go('app.order-management.invoices-new'); 
        }
        vm.InvoicesPage = function(){
            $state.go('app.order-management.invoices'); 
        }
        
    	vm.ssName = "s"
    }
})();