(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('inventoryController', inventoryController);

    /** @ngInject */
    function inventoryController($scope, $state)
    {

        
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
		
		var vm = this;

        // Data
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

		
		// Methods
        vm.itemseditpage = function(id){
			 $state.go('app.inventory-management.items-edit', {id: id}); 
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
		
        //////////
    }
})();