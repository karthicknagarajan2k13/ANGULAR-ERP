(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('viewWarehouseLocationController', viewWarehouseLocationController);

    /** @ngInject */
    function viewWarehouseLocationController(whApi, $scope, $document, $state)
    {

        var vm = this;

        //Api Call
        var dataPromise = whApi.viewWarehouseLocation($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.warehouse_location_data = result; 
        }); 

        vm.editWarehouseLocationPage = function(warehouse_location){
             $state.go('app.warehouse-management.stock-locations-edit', {obj:{warehouse_location: warehouse_location}});
        }
        vm.deleteWarehouseLocation = function(id){
            var delete_ids = JSON.stringify([id])
            whApi.deleteAllWarehouseLocation({ids: delete_ids})
            $state.go('app.warehouse-management.stock-locations'); 
        }
        vm.newWarehouseLocationPage = function(){
            $state.go('app.warehouse-management.stock-locations-new'); 
        }
       

		vm.ssName = "s"
      
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
                    // Normally you would update the media warehouse_location
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