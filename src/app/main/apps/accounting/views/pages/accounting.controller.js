(function ()
{
    'use strict';

    angular
        .module('app.accounting')
        .controller('AccountingController', AccountingController);

    /** @ngInject */
	
	
    function AccountingController($scope, $interval, $state, $mdSidenav, DashboardData)
    {
        var vm = this;

        // Data
        vm.dashboardData = DashboardData;
		vm.projects = vm.dashboardData.projects;
		
		vm.tabledata1 = [
        {date: '22/04/2017', amt1:'10', amt2:'5', ttl:'305.0', amt3:'100', inflow:'case Sales', type: 'type-1', name: 'Janis M Parker', code: '0000001', notify: 'Lorem Ipsum is simply dummy text', orderID: '00001', total: '$256', status: 'Booked'},
		{date: '30/04/2017', amt1:'100', amt2:'10', ttl:'95.10', amt3:'10', inflow:'Main Income', type: 'type-2', name: 'Rochelle R Bennett', code: '0000005', notify: ' It was popularised in the 1960s', orderID: '00001', total: '$146', status: 'test status'},
		{date: '01/08/2017', amt1:'5', amt2:'100', ttl:'278.0', amt3:'100', inflow:'Other Income', type: 'type-3', name: 'Anna F Henderson', code: '0000006', notify: 'test notify', orderID: '00005', total: '$559', status: 'test status'},
		{date: '03/04/2017', type: 'type-4', name: 'Sean M Williams', code: '0000001', notify: ' It was popularised in the 1960s', orderID: '00001', total: '$916', status: 'test status'},
        {date: '22/04/2017', type: 'type-5', name: 'Bonnie M Huynh', code: '0000002', notify: 'test notify', orderID: '00001', total: '$056', status: 'test status'}
		];
		
		
		

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
		
		 // Widget 1
        vm.widget1 = {
            title: vm.dashboardData.widget1.title,
            chart: {
                options: {
                    chart: {
                        type                   : 'lineChart',
                        color                  : ['#4caf50', '#3f51b5', '#ff5722'],
                        height                 : 320,
                        margin                 : {
                            top   : 32,
                            right : 32,
                            bottom: 32,
                            left  : 48
                        },
                        useInteractiveGuideline: true,
                        clipVoronoi            : false,
                        interpolate            : 'cardinal',
                        x                      : function (d)
                        {
                            return d.x;
                        },
                        y                      : function (d)
                        {
                            return d.y;
                        },
                        xAxis                  : {
                            tickFormat: function (d)
                            {
                                return d + ' month.';
                            },
                            showMaxMin: false
                        },
                        yAxis                  : {
                            tickFormat: function (d)
                            {
                                return d + ' Hrs';
                            }
                        },
                        interactiveLayer       : {
                            tooltip: {
                                gravity: 's',
                                classes: 'gravity-s'
                            }
                        },
                        legend                 : {
                            margin    : {
                                top   : 8,
                                right : 0,
                                bottom: 32,
                                left  : 0
                            },
                            rightAlign: false
                        }
                    }
                },
                data   : vm.dashboardData.widget1.chart
            }
        };
		
		// bar chart
        vm.barChart = {
            data             : {
                labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
                series: [
                    [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
					[9, 8, 3, 1, 0, 7, 3, 5, 6, 2, 2, 6],
                    [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
                ]
            },
            options          : {
                seriesBarDistance: 15
            },
            responsiveOptions: [
                ['screen and (min-width: 641px) and (max-width: 1024px)', {
                    seriesBarDistance: 10,
                    axisX            : {
                        labelInterpolationFnc: function (value)
                        {
                            return value;
                        }
                    }
                }],
                ['screen and (max-width: 640px)', {
                    seriesBarDistance: 5,
                    axisX            : {
                        labelInterpolationFnc: function (value)
                        {
                            return value[0];
                        }
                    }
                }]
            ]
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