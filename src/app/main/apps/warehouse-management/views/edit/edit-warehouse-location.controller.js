(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('editWarehouseLocationController', editWarehouseLocationController);

    /** @ngInject */
    function editWarehouseLocationController(whApi, $scope, $mdDialog, $document, $state)
    {

        
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
		
		var vm = this;
		vm.ssName = "s"

        vm.warehouse_location = $state.params.obj

        var dataPromise = whApi.get_warehouses({});
        dataPromise.then(function(result) { 
            $scope.get_warehouses = result;
        }); 


        vm.updateWarehouseLocation = function(){
           var dataPromise = whApi.updateWarehouseLocation(vm.warehouse_location.warehouse_location.id,vm.warehouse_location);
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.warehouse_location_id) !== "undefined"){
                        $state.go('app.warehouse-management.stock-locations-view', {obj:{id: $scope.data.warehouse_location_id}}); 
                    }
                }
            }); 
        }

        vm.viewWarehouseLocationPage =function(id){
            $state.go('app.warehouse-management.stock-locations-view', {obj:{id: id}}); 
        }
        vm.newWarehouseLocationPage = function(){
            $state.go('app.warehouse-management.stock-locations-new'); 
        }
        vm.LocationsPage = function(){
            $state.go('app.warehouse-management.stock-locations'); 
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