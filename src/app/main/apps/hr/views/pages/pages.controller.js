(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('hrController', hrController);

    /** @ngInject */
    function hrController($scope, $state, Statuses, Orders)
    {

        
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
		
		
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
        vm.empeditpage = function(id){
			 $state.go('app.hr.employees-edit', {id: id}); 
		}
	    vm.empviewpage = function(id){
			 $state.go('app.hr.employees-view', {id: id}); 
		}
		
        vm.timeceditpage = function(id){
			 $state.go('app.hr.timeclock-edit', {id: id}); 
		}
	    vm.timecviewpage = function(id){
			 $state.go('app.hr.timeclock-view', {id: id}); 
		}
		
		vm.expeeditpage = function(id){
			 $state.go('app.hr.expenses-edit', {id: id}); 
		}
	    vm.expeviewpage = function(id){
			 $state.go('app.hr.expenses-view', {id: id}); 
		}
		
		vm.payrolleditpage = function(id){
			 $state.go('app.hr.payroll-edit', {id: id}); 
		}
	    vm.payrollviewpage = function(id){
			 $state.go('app.hr.payroll-view', {id: id}); 
		}
		
        //////////
    }
})();