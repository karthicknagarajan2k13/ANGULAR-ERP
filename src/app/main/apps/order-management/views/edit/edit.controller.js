(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('SalesOrdersEditController', SalesOrdersEditController);

    /** @ngInject */
    function SalesOrdersEditController($scope, omApi, $document, $state, Product)
    {

        
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
		
		var vm = this;

        var dataPromise = omApi.editSalesOrder({id:$state.params.obj.id});
        dataPromise.then(function(result) { 
            $scope.sales_order = result;
        });

        var dataPromise = omApi.getCustomers();
        dataPromise.then(function(result) { 
            $scope.get_customers = result;
            console.log("get_customers",$scope.get_customers)
        });
        
        var dataPromise = omApi.getContacts();
        dataPromise.then(function(result) { 
            $scope.get_contacts = result;
            console.log("get_contacts",$scope.get_contacts)
        });

        vm.updateSalesOrder = function(){
           var dataPromise = omApi.updateSalesOrder($scope.sales_order.id,$scope.sales_order);
            dataPromise.then(function(result) { 
                $scope.data = result;
                console.log("$scope.data",$scope.data)
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.sales_order_id) !== "undefined"){
                        $state.go('app.order-management.sales-order-view', {obj:{id: $scope.data.sales_order_id}}); 
                    }
                }
            }); 
        }
        vm.SalesOrdersPage = function(){
            $state.go('app.order-management.sales-orders'); 
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