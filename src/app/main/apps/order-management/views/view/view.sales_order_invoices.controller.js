(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('viewSalesOrderInvoiceController', viewSalesOrderInvoiceController);

    /** @ngInject */
    function viewSalesOrderInvoiceController($scope, omApi, $document, $state, Product)
    {

        var vm = this;

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