(function ()
{
    'use strict';

    angular
        .module('app.warehouse-management')
        .controller('newWarehouseController', newWarehouseController);

    /** @ngInject */
    function newWarehouseController(whApi, $scope, $document, $state)
    {

        var vm = this;
        vm.warehouse = {}
		vm.ssName = "s"

        vm.saveWarehouse = function(){
            var dataPromise = whApi.createWarehouse({warehouse:vm.warehouse});
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.warehouse_id) !== "undefined"){
                        $state.go('app.warehouse-management.warehouse-view', {obj:{id: $scope.data.warehouse_id}}); 
                    }
                }
            }); 
        }
        vm.warehouseDataClear = function(){
            vm.warehouse = {}
        }
        vm.newWarehousePage = function(){
            $state.go('app.warehouse-management.warehouse-new'); 
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