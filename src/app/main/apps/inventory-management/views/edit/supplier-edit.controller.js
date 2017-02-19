(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('editSupplierController', editSupplierController);

    /** @ngInject */
    function editSupplierController(imApi, $scope, $document, $state, Product)
    {

        var vm = this;
        console.log("$state.params",$state.params)
        var dataPromise = imApi.editSupplier({id:$state.params.obj.id});
        dataPromise.then(function(result) { 
            $scope.supplier = result;
            $scope.supplier.supplier_attributes.supplier_since = new Date($scope.supplier.supplier_attributes.supplier_since);
        });

		vm.ssName = "s"
	    vm.orders = Product.data;

        vm.updateSupplier = function(){
           var dataPromise = imApi.updateSupplier($scope.supplier.id,$scope.supplier);
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.supplier_id) !== "undefined"){
                        $state.go('app.inventory-management.suppliers-view', {obj:{id: $scope.data.supplier_id}}); 
                    }
                }
            }); 
        }
        vm.viewSupplierPage =function(id){
            $state.go('app.inventory-management.suppliers-view', {obj:{id: id}}); 
        }
        vm.newSupplierPage = function(){
            $state.go('app.inventory-management.suppliers-new'); 
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