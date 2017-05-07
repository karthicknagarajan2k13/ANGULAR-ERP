(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('itemController', itemController);

    /** @ngInject */
    function itemController($window, imApi, $scope, $state, Statuses, Orders)
    {

        
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
		
		
		var vm = this;

        // Data
        vm.search_data = {}
        var dataPromise = imApi.getItems({});
        dataPromise.then(function(result) { 
            $scope.items_data = result;
            console.log("$scope.items_data",$scope.items_data)
        });
        var dataPromise = imApi.get_suppliers({});
        dataPromise.then(function(result) { 
            $scope.get_suppliers = result;
        });  
        var dataPromise = imApi.get_categories({});
        dataPromise.then(function(result) { 
            $scope.get_categories = result;
        }); 



        vm.orders = Orders.data;
        vm.statuses = Statuses.data;
        vm.dtInstance = {};
        vm.dtOptions = {
            dom         : 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            columnDefs  : [
                {
                    // Target the id column
                    targets: 0,
                    width  : '10px'
                }
            ],
            initComplete: function ()
            {
                var api = this.api(),
                    searchBox = angular.element('body').find('#e-commerce-products-search');

                // Bind an external input as a table wide search box
                if ( searchBox.length > 0 )
                {
                    searchBox.on('keyup', function (event)
                    {
                        api.search(event.target.value).draw();
                    });
                }
            },
            pagingType  : 'simple',
            lengthMenu  : [10, 20, 30, 50, 100],
            pageLength  : 20,
            scrollY     : 'auto',
            responsive  : true
        };


        vm.newItemPage = function(){
            $state.go('app.inventory-management.items-new'); 
        }
        vm.editItemPage = function(category){
             $state.go('app.inventory-management.items-edit', {obj:{item: category}});
        }
        vm.viewItemPage = function(id){
            $state.go('app.inventory-management.items-view', {obj:{id: id}}); 
        }
        vm.deleteAllItem = function () {
            var delete_ids = [];
            angular.forEach($scope.items_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = imApi.deleteAllItem({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = imApi.getItems({});
                    dataPromise.then(function(result) { 
                        $scope.items_data = result;
                    }); 
                });
            }
        };
        vm.deleteItem = function (id) {
            var delete_ids = JSON.stringify([id])
            imApi.deleteAllItem({ids: delete_ids})
            $window.location.reload();
        };
        vm.searchItemData = function(id){
            console.log("vm.search_data",vm.search_data)
            var dataPromise = imApi.getItems(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.items_data = result; 
            }); 
        }
        vm.searchItemDataClear = function(id){
            vm.search_data = {}
        }
	
    }
})();