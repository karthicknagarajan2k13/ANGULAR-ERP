(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('NewSalesOrdersInvoicesController', NewSalesOrdersInvoicesController);

    /** @ngInject */
    function NewSalesOrdersInvoicesController($scope, omApi, $document, $state, Product)
    {

        var vm = this;
        vm.invoice = {}


        var dataPromise = omApi.get_SalesOrders();
        dataPromise.then(function(result) { 
            $scope.get_sales_orders = result;
            console.log("get_sales_orders",$scope.get_sales_orders)
        });

        vm.createSalesOrderInvoice = function(){
            var dataPromise = omApi.createSalesOrderInvoice({invoice:vm.invoice});
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.invoice_id) !== "undefined"){
                        $state.go('app.order-management.invoices-view', {obj:{id: $scope.data.invoice_id}}); 
                    }
                }
            }); 
        }
        vm.newSalesOrderInvoice = function(id){
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