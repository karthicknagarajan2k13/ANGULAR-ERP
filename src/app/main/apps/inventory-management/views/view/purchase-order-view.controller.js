(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('viewPurchaseOrderController', viewPurchaseOrderController);

    /** @ngInject */
    function viewPurchaseOrderController(imApi, $scope, $document, $state, Product)
    {

        $scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
		
		var vm = this;

        //Api Call
        var dataPromise = imApi.viewPurchaseOrder($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.purchase_order_data = result; 
        }); 

        vm.editPurchaseOrderPage = function(id){
             $state.go('app.inventory-management.purchase-orders-edit', {obj:{id: id}});
        }
        vm.deletePurchaseOrder = function(id){
            var delete_ids = JSON.stringify([id])
            imApi.deleteAllPurchaseOrder({ids: delete_ids})
            $state.go('app.inventory-management.purchase-orders'); 
        }
		vm.ssName = "s"
	    vm.orders = Product.data;
        vm.newPurchaseOrderPage = function(){
            $state.go('app.inventory-management.purchase-orders-new'); 
        }
       
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
                    // Normally you would update the media purchase_order
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