(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('editItemController', editItemController);

    /** @ngInject */
    function editItemController($mdToast,imApi, $scope, $document, $state)
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
		vm.item = $state.params.obj

		vm.ssName = "s"
        
        var dataPromise = imApi.get_categories({});
        dataPromise.then(function(result) { 
            $scope.get_categories = result;
        }); 
        var dataPromise = imApi.get_suppliers({});
        dataPromise.then(function(result) { 
            $scope.get_suppliers = result;
        });

        vm.updateItem = function(){
           var dataPromise = imApi.updateItem(vm.item.item.id,vm.item);
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
                    if( typeof($scope.data.item_id) !== "undefined"){
                        $state.go('app.inventory-management.items-view', {obj:{id: $scope.data.item_id}}); 
                    }
                }
            }); 
        }

        vm.viewItemPage =function(id){
            $state.go('app.inventory-management.items-view', {obj:{id: id}}); 
        }
        vm.newItemPage = function(){
            $state.go('app.inventory-management.items-new'); 
        }
        vm.ItemsPage = function(){
            $state.go('app.inventory-management.items'); 
        }		
    }
})();