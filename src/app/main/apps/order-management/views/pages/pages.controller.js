(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('SalesOrdersController', SalesOrdersController);

    /** @ngInject */
    function SalesOrdersController($scope, $state)
    {

        $scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
		
		
		var vm = this;

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
        vm.seditpage = function(id){
			 $state.go('app.order-management.sales-order-edit', {id: id}); 
		}
	    vm.sviewpage = function(id){
			 $state.go('app.order-management.sales-order-view', {id: id}); 
		}

		vm.invoiceeditpage = function(id){
			 $state.go('app.order-management.invoices-edit', {id: id}); 
		}
	    vm.invoiceviewpage = function(id){
			 $state.go('app.order-management.invoices-view', {id: id}); 
		}
		
    }
})();