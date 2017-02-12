(function ()
{
    'use strict';

    angular
        .module('app.warehouse-management')
        .controller('warehouseController', warehouseController);

    /** @ngInject */
    function warehouseController($state, Statuses, Orders)
    {

        var vm = this;

        // Data
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

		
		// Methods
        vm.stockeditpage = function(id){
			 $state.go('app.warehouse-management.stock-locations-edit', {id: id}); 
		}
	    vm.stockviewpage = function(id){
			 $state.go('app.warehouse-management.stock-locations-view', {id: id}); 
		}

		vm.wereeditpage = function(id){
			 $state.go('app.warehouse-management.warehouse-edit', {id: id}); 
		}
	    vm.wereviewpage = function(id){
			 $state.go('app.warehouse-management.warehouse-view', {id: id}); 
		}
		
		
        //////////
    }
})();