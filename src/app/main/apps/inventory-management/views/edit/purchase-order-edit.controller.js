(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('editPurchaseOrderController', editPurchaseOrderController);

    /** @ngInject */
    function editPurchaseOrderController(imApi, $scope, $document, $state, Product)
    {

        
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
		
		
		var vm = this;
        console.log("$state.params",$state.params)
        var dataPromise = imApi.editPurchaseOrder({id:$state.params.obj.id});
        dataPromise.then(function(result) { 
            $scope.purchase_order = result;
            console.log("purchase_order",$scope.purchase_order)
        });
        var dataPromise = imApi.get_suppliers({});
        dataPromise.then(function(result) { 
            $scope.get_suppliers = result;
        });
        
		vm.ssName = "s"
	    vm.orders = Product.data;

        vm.updatePurchaseOrder = function(){
           var dataPromise = imApi.updatePurchaseOrder($scope.purchase_order.id,$scope.purchase_order);
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
        vm.viewPurchaseOrderPage =function(id){
            $state.go('app.inventory-management.purchase-orders-view', {obj:{id: id}}); 
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