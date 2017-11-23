(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('viewItemSourceController', viewItemSourceController);

    /** @ngInject */
    function viewItemSourceController(imApi, $scope, $mdDialog, $document, $state,$window)
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
 
        var dataPromise = imApi.show_item_source({"item_source_id":$state.params.obj.id,user_id:session.id});
        dataPromise.then(function(result) { 
            $scope.item_source_data = result.item_source;
        }); 

        vm.newItemPage = function(){
            $state.go('app.inventory-management.item-source-new'); 
        }

        vm.editItemPage = function(data){
            $state.go('app.inventory-management.item-source-edit', {obj:{data: data}}); 
        }
        vm.deleteItem = function(data){
            var dataPromise = imApi.delete_item_source({"item_source_id":data,user_id:session.id});
            dataPromise.then(function(result) { 
                $state.go('app.inventory-management.item-source'); 
            }); 
        }
    }
})();