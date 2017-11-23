(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('viewInventoryItemController', viewInventoryItemController);

    /** @ngInject */
    function viewInventoryItemController(imApi, $scope, $mdDialog, $document, $state,$window)
    {
        /*$window.localStorage.setItem('current_user',JSON.stringify($scope.user));*/
        
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

        var session = $window.JSON.parse($window.localStorage.getItem('userInfo'))
 
        var dataPromise = imApi.show_inventory_item({"inventory_item_id":$state.params.obj.id,user_id:session.id});
            dataPromise.then(function(result) { 
            $scope.data = result.inventory_item;
          
            var dataPromise = imApi.show_listing({"listing_id":result.inventory_item.listing_id,user_id:session.id});
                dataPromise.then(function(result) { 
                $scope.listing_name = result.listing.title;
            });
        }); 

        vm.newItemPage = function(){
            $state.go('app.inventory-management.inventory-item-new'); 
        }

        vm.editItemPage = function(data){
            $state.go('app.inventory-management.inventory-item-edit', {obj:{data: data}}); 
        }
        vm.deleteItem = function(data){
                var dataPromise = imApi.deleteInventoryItem({"inventory_item_id":data,user_id:session.id});
                dataPromise.then(function(result) { 
                    $state.go('app.inventory-management.inventory-item'); 
                }); 
        }


    }
})();