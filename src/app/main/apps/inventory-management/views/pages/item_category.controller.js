(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('itemCategoryController', itemCategoryController);

    /** @ngInject */
    function itemCategoryController($window, imApi, $scope, $state, Statuses, Orders)
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
        var dataPromise = imApi.getCategories({});
        dataPromise.then(function(result) { 
            $scope.categories_data = result;
            console.log("$scope.categories_data",$scope.categories_data)
        }); 
        var dataPromise = imApi.getUsers({});
        dataPromise.then(function(result) { 
            $scope.get_users = result;
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


        vm.newItemCategoryPage = function(){
            $state.go('app.inventory-management.item-categories-new'); 
        }
        vm.editItemCategoryPage = function(category){
             $state.go('app.inventory-management.item-categories-edit', {obj:{category: category}});
        }
        vm.viewItemCategoryPage = function(id){
            $state.go('app.inventory-management.items-categories-view', {obj:{id: id}}); 
        }
        vm.deleteAllItemCategory = function () {
            var delete_ids = [];
            angular.forEach($scope.categories_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = imApi.deleteAllCategory({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = imApi.getCategories({});
                    dataPromise.then(function(result) { 
                        $scope.categories_data = result;
                    }); 
                });
            }
        };
        vm.deleteItemCategory = function (id) {
            var delete_ids = JSON.stringify([id])
            imApi.deleteAllCategory({ids: delete_ids})
            $window.location.reload();
        };
        vm.searchCategoryData = function(id){
            console.log("vm.search_data",vm.search_data)
            var dataPromise = imApi.getCategories(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.categories_data = result; 
            }); 
        }
        vm.searchCategoryDataClear = function(id){
            vm.search_data = {}
        }


		// Methods
        vm.itemseditpage = function(id){
			 $state.go('', {id: id}); 
		}
	    vm.itemsviewpage = function(id){
			 $state.go('app.inventory-management.items-view', {id: id}); 
		}

		vm.itemceditpage = function(id){
			 $state.go('app.inventory-management.item-categories-edit', {id: id}); 
		}
	    vm.itemcviewpage = function(id){
			 $state.go('app.inventory-management.items-categories-view', {id: id}); 
		}
		
		vm.supplierseditpage = function(id){
			 $state.go('app.inventory-management.suppliers-edit', {id: id}); 
		}
	    vm.suppliersviewpage = function(id){
			 $state.go('app.inventory-management.suppliers-view', {id: id}); 
		}

		vm.pordereditpage = function(id){
			 $state.go('app.inventory-management.purchase-orders-edit', {id: id}); 
		}
	    vm.porderviewpage = function(id){
			 $state.go('app.inventory-management.purchase-orders-view', {id: id}); 
		}
		
    }
})();