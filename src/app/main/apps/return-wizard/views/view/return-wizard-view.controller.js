(function ()
{
    'use strict';

    angular
        .module('app.return-wizard')
        .controller('ReturnWizardViewController', ReturnWizardViewController);

    /** @ngInject */
	
	
    function ReturnWizardViewController($scope, $interval, $state, $mdSidenav, DashboardData)
    {
        var vm = this;

        // Data
        vm.dashboardData = DashboardData;
		vm.projects = vm.dashboardData.projects;
		
		vm.tabledata1 = [
        {date: '22/04/2017', type: 'type-1', name: 'Janis M Parker', code: '0000001', notify: 'Lorem Ipsum is simply dummy text', orderID: '00001', total: '$256', status: 'Booked'},
		{date: '30/04/2017', type: 'type-2', name: 'Rochelle R Bennett', code: '0000005', notify: ' It was popularised in the 1960s', orderID: '00001', total: '$146', status: 'test status'},
		{date: '01/08/2017', type: 'type-3', name: 'Anna F Henderson', code: '0000006', notify: 'test notify', orderID: '00005', total: '$559', status: 'test status'},
		{date: '03/04/2017', type: 'type-4', name: 'Sean M Williams', code: '0000001', notify: ' It was popularised in the 1960s', orderID: '00001', total: '$916', status: 'test status'},
        {date: '22/04/2017', type: 'type-5', name: 'Bonnie M Huynh', code: '0000002', notify: 'test notify', orderID: '00001', total: '$056', status: 'test status'}
		];
		
		$scope.id = "CUS0001";
		$scope.code = "123456";
		$scope.name = "John";
		$scope.description = "Lorem Ipsum is simply dummy text";
		$scope.date = "22-07-2017";
		$scope.subject = "Subject";
		$scope.amount = "$254";
		$scope.invoice = "No.00001";
		
		
		

        vm.dtInstance = {};
        vm.dtOptions = {
            dom         : 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            columnDefs  : [
                {
                    // Target the id column
                    targets: 0,
                    width  : '72px'
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
        vm.notifypage = function(id){
			 $state.go('app.dashboard.notifications', {id: id});
		}
		
		vm.dbpage = function(id){
			 $state.go('app.dashboard.dashboard', {id: id});
		}
	    //////////
		
		
		
    }
})();