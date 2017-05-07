(function ()
{
    'use strict';

    angular
        .module('app.manufacturing')
        .controller('manufacturingController', manufacturingController);

    /** @ngInject */
    function manufacturingController($scope, $state, Statuses, Orders)
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
        vm.materialeditpage = function(id){
			 $state.go('app.manufacturing.materials-edit', {id: id}); 
		}
	    vm.materialviewpage = function(id){
			 $state.go('app.manufacturing.materials-view', {id: id}); 
		}

		vm.manufacturingeditpage = function(id){
			 $state.go('app.manufacturing.manufacturing-edit', {id: id}); 
		}
	    vm.manufacturingviewpage = function(id){
			 $state.go('app.manufacturing.manufacturing-view', {id: id}); 
		}
		
		
        //////////
    }
})();