(function ()
{
    'use strict';

    angular
        .module('app.warehouse-management')
        .controller('newWarehouseLocationController', newWarehouseLocationController);

    /** @ngInject */
    function newWarehouseLocationController($mdToast,whApi, $scope, $document, $state)
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
        vm.warehouse_location = {}
        vm.warehouse_location.warehouse_id = $state.params.warehouse_id

		vm.ssName = "s"
        var dataPromise = whApi.get_warehouses({});
        dataPromise.then(function(result) { 
            $scope.get_warehouses = result;
        }); 
        
        vm.saveWarehouseLocation = function(){
            var dataPromise = whApi.createWarehouseLocation({warehouse_location:vm.warehouse_location});
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
                    if( typeof($scope.data.warehouse_location_id) !== "undefined"){
                        $state.go('app.warehouse-management.stock-locations-view', {obj:{id: $scope.data.warehouse_location_id}}); 
                    }
                }
            }); 
        }
        vm.warehouseLocationDataClear = function(){
            vm.warehouse_location = {}
        }
        vm.newWarehouseLocationPage = function(){
            $state.go('app.warehouse-management.stock-locations-new'); 
        }
        vm.LocationsPage = function(){
            $state.go('app.warehouse-management.stock-locations'); 
        }	
    }
})();