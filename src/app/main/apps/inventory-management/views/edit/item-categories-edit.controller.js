(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('editItemCategoryController', editItemCategoryController);

    /** @ngInject */
    function editItemCategoryController($mdToast,imApi, $scope, $document, $state)
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
		vm.category = $state.params.obj

		vm.ssName = "s"

        vm.updateCategory = function(){
           var dataPromise = imApi.updateCategory(vm.category.category.id,vm.category);
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
                    if( typeof($scope.data.category_id) !== "undefined"){
                        $state.go('app.inventory-management.items-categories-view', {obj:{id: $scope.data.category_id}}); 
                    }
                }
            }); 
        }
        vm.viewItemCategoryPage =function(id){
            $state.go('app.inventory-management.items-categories-view', {obj:{id: id}}); 
        }
        vm.newItemCategoryPage = function(){
            $state.go('app.inventory-management.item-categories-new'); 
        }
        vm.CategoriesPage = function(){
            $state.go('app.inventory-management.item-categories'); 
        }

    }
})();