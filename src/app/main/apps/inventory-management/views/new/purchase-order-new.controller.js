(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('newPurchaseOrderController', newPurchaseOrderController);

    /** @ngInject */
    function newPurchaseOrderController(imApi, $scope, $document, $state, Product)
    {

        
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
		
		
		var vm = this;
        vm.purchase_order = {}
		
		vm.ssName = "s"
	    vm.orders = Product.data;
        var dataPromise = imApi.get_suppliers({});
        dataPromise.then(function(result) { 
            $scope.get_suppliers = result;
        }); 
        vm.savePurchaseOrder = function(){
            var dataPromise = imApi.createPurchaseOrder({purchase_order:vm.purchase_order});
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.purchase_order_id) !== "undefined"){
                        $state.go('app.inventory-management.purchase-orders-view', {obj:{id: $scope.data.purchase_order_id}}); 
                    }
                }
            }); 
        }
        vm.purchaseOrderDataClear = function(){
            vm.purchase_order = {}
        }
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