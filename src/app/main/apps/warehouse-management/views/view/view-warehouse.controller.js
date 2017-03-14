(function ()
{
    'use strict';

    angular
        .module('app.warehouse-management')
        .controller('viewWarehouseController', viewWarehouseController);

    /** @ngInject */
    function viewWarehouseController(whApi, $scope, $document, $state)
    {

        var vm = this;
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
		vm.dtInstance = {};
        vm.dtOptions = {
            bLengthChange  : false,
            paging: false,
            searching: false,
            bInfo: false,
        };
		
		
		
        vm.ssName = "s"

        //Api Call
        var dataPromise = whApi.viewWarehouse($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.warehouse_data = result; 
        }); 

        vm.editWarehousePage = function(warehouse){
             $state.go('app.warehouse-management.warehouse-edit', {obj:{warehouse: warehouse}});
        }
        vm.deleteWarehouse = function(id){
            var delete_ids = JSON.stringify([id])
            whApi.deleteAllWarehouse({ids: delete_ids})
            $state.go('app.warehouse-management.warehouse'); 
        }
        vm.newWarehousePage = function(){
            $state.go('app.warehouse-management.warehouse-new'); 
        }

        vm.newWarehouseLocationPage = function(){
            $state.go('app.warehouse-management.stock-locations-new',{warehouse_id: $scope.warehouse_data.id}); 
        }
        vm.viewWarehouseLocationPage = function(id){
            $state.go('app.warehouse-management.stock-locations-view', {obj:{id: id}}); 
        }
        vm.deleteAllWarehouseLocation = function () {
            var delete_ids = [];
            angular.forEach($scope.warehouse_data.warehouse_locations, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = whApi.deleteAllWarehouseLocation({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = whApi.viewWarehouse($state.params.obj.id);
                    dataPromise.then(function(result) { 
                        $scope.warehouse_data = result;
                    }); 
                });
            }
        };
        vm.WarehousesPage = function(){
            $state.go('app.warehouse-management.warehouse'); 
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