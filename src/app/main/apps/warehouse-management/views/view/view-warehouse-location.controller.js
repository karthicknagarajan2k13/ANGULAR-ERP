(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('viewWarehouseLocationController', viewWarehouseLocationController);

    /** @ngInject */
    function viewWarehouseLocationController(whApi, $scope, $document, $state)
    {

        $scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
		
		var vm = this;

        vm.warehouse_location_item_data = {}

        var dataPromise = whApi.get_items({});
        dataPromise.then(function(result) { 
            $scope.get_items = result;
        }); 

        vm.changedItemValue = function(item){
            var item = angular.fromJson(item)
            vm.warehouse_location_item_data.item_in_stock = item.item_in_stock
            vm.warehouse_location_item_data.item_id = item.items_id
        }

        vm.addItemWarehouseLocation = function(){
            var dataPromise = whApi.addItemWarehouseLocation({warehouse_location_item:vm.warehouse_location_item_data});
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.warehouse_location_item_id) !== "undefined"){
                        var dataPromise = whApi.viewWarehouseLocation($state.params.obj.id);
                        dataPromise.then(function(result) { 
                            $scope.warehouse_location_data = result;
                            vm.warehouse_location_item_data.warehouse_location_id = $scope.warehouse_location_data.id 
                        });                    
                    }
                }
            }); 
        }
        vm.LocationsPage = function(){
            $state.go('app.warehouse-management.stock-locations'); 
        }

        //Api Call
        var dataPromise = whApi.viewWarehouseLocation($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.warehouse_location_data = result;
            vm.warehouse_location_item_data.warehouse_location_id = $scope.warehouse_location_data.id 
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