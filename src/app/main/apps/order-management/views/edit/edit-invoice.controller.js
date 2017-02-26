(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('SalesOrdersInvoiceEditController', SalesOrdersInvoiceEditController);

    /** @ngInject */
    function SalesOrdersInvoiceEditController($scope, omApi, $document, $state, Product)
    {

        
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
		
		var vm = this;

        var dataPromise = omApi.get_SalesOrders();
        dataPromise.then(function(result) { 
            $scope.get_sales_orders = result;
            console.log("get_sales_orders",$scope.get_sales_orders)
        });
        var dataPromise = omApi.editSalesOrderInvoice({id:$state.params.obj.id});
        dataPromise.then(function(result) { 
            $scope.invoice = result;
            $scope.invoice.create_timestamp = new Date($scope.invoice.create_timestamp);
            $scope.invoice.cancelled_at = new Date($scope.invoice.cancelled_at);
            $scope.invoice.paid_at = new Date($scope.invoice.paid_at);
            $scope.invoice.refunded_at = new Date($scope.invoice.refunded_at);
            console.log("invoice",$scope.invoice)
        });
        vm.InvoicesPage = function(){
            $state.go('app.order-management.invoices'); 
        }
        
        vm.updateSalesOrderInvoice = function(){
           var dataPromise = omApi.updateSalesOrderInvoice($scope.invoice.id,$scope.invoice);
            dataPromise.then(function(result) { 
                $scope.data = result;
                console.log("$scope.data",$scope.data)
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.invoice_id) !== "undefined"){
                        $state.go('app.order-management.invoices-view', {obj:{id: $scope.data.invoice_id}}); 
                    }
                }
            }); 
        }

        vm.viewInvoiceSalseOrder =function(id){
            $state.go('app.order-management.invoices-view', {obj:{id: id}}); 
        }
        vm.newSalesOrderInvoice = function(){
            $state.go('app.order-management.invoices-new'); 
        }
		vm.ssName = "s"
	    vm.orders = Product.data;
        /**
         * File upload success callback
         * Triggers when single upload completed
         *
         * @param file
         * @param message
         */
        function fileSuccess(file, message)  {
            // Iterate through the media list, find the one we
            // are added as a temp and replace its data
            // Normally you would parse the message and extract
            // the uploaded file data from it
            angular.forEach(vm.product.images, function (media, index)
            {
                if ( media.id === file.uniqueIdentifier )
                {
                    // Normally you would update the media item
                    // from database but we are cheating here!
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(media.file.file);
                    fileReader.onload = function (event)
                    {
                        media.url = event.target.result;
                    };

                    // Update the image type so the overlay can go away
                    media.type = 'image';
                }
            });
        }
		
    }
})();