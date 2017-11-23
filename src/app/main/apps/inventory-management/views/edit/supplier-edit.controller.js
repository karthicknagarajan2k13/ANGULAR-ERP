(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('editSupplierController', editSupplierController);

    /** @ngInject */
    function editSupplierController($mdToast,imApi, $scope, $document, $state)
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
        var dataPromise = imApi.editSupplier({id:$state.params.obj.id});
        dataPromise.then(function(result) { 
            $scope.supplier = result;
            $scope.supplier.supplier_attributes.supplier_since = new Date($scope.supplier.supplier_attributes.supplier_since);
        });

		vm.ssName = "s"

        vm.updateSupplier = function(){
           var dataPromise = imApi.updateSupplier($scope.supplier.id,$scope.supplier);
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
        vm.SuppliersPage = function(){
            $state.go('app.inventory-management.suppliers'); 
        }
    }
})();