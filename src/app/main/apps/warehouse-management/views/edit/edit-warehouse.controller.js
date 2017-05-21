(function ()
{
    'use strict';

    angular
        .module('app.warehouse-management')
        .controller('editWarehouseController', editWarehouseController);

    /** @ngInject */
    function editWarehouseController($mdToast,whApi, $scope, $document, $state)
    {

        
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
        var last = {
          bottom: false,
          top: true,
          left: false,
          right: true
        };
        function sanitizePosition() {
            var current = $scope.toastPosition;
            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;
            last = angular.extend({},current);
        }
        $scope.toastPosition = angular.extend({},last);
        $scope.getToastPosition = function() {
        sanitizePosition();
        return Object.keys($scope.toastPosition)
          .filter(function(pos) { return $scope.toastPosition[pos]; })
          .join(' ');
        };
		var vm = this;
		vm.warehouse = $state.params.obj
        console.log("vm.warehouse",vm.warehouse)

		vm.ssName = "s"

        vm.updateWarehouse = function(){
           var dataPromise = whApi.updateWarehouse(vm.warehouse.warehouse.id,vm.warehouse);
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    var pinTo = $scope.getToastPosition();
                    $mdToast.show(
                      $mdToast.simple()
                        .textContent($scope.data.message)
                        .position(pinTo )
                        .hideDelay(3000)
                    );
                }else{
                    if( typeof($scope.data.warehouse_id) !== "undefined"){
                        $state.go('app.warehouse-management.warehouse-view', {obj:{id: $scope.data.warehouse_id}}); 
                    }
                }
            }); 
        }
        vm.viewWarehousePage =function(id){
            $state.go('app.warehouse-management.warehouse-view', {obj:{id: id}}); 
        }
        vm.newWarehousePage = function(){
            $state.go('app.warehouse-management.warehouse-new'); 
        }
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