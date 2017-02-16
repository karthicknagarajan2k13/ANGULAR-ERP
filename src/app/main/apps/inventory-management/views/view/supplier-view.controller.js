(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('viewSupplierController', viewSupplierController);

    /** @ngInject */
    function viewSupplierController(imApi, $scope, $document, $state, Product)
    {

        var vm = this;

        //Api Call
        var dataPromise = imApi.viewSupplier($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.supplier_data = result;
            console.log("$scope.supplier_data",$scope.supplier_data)
        }); 

        vm.editSupplierPage = function(id){
             $state.go('app.inventory-management.suppliers-edit', {obj:{id: id}});
        }
        vm.deleteSupplier = function(id){
            var delete_ids = JSON.stringify([id])
            imApi.deleteAllSupplier({ids: delete_ids})
            $state.go('app.inventory-management.suppliers'); 
        }
        vm.newPurchaseOrderPage = function(){
            $state.go('app.inventory-management.purchase-orders-new'); 
        }
        vm.editPurchaseOrderPage = function(id){
             $state.go('app.inventory-management.purchase-orders-edit', {obj:{id: id}});
        }
        vm.viewPurchaseOrderPage = function(id){
            $state.go('app.inventory-management.purchase-orders-view', {obj:{id: id}}); 
        }
        vm.deleteAllPurchaseOrder = function () {
            var delete_ids = [];
            angular.forEach($scope.purchase_orders_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                imApi.deleteAllPurchaseOrder({ids: delete_ids})
                $window.location.reload();
            }
        };
        vm.deletePurchaseOrder = function (id) {
            var delete_ids = JSON.stringify([id])
            imApi.deleteAllPurchaseOrder({ids: delete_ids})
            $window.location.reload();
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
                    // Normally you would update the media supplier
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