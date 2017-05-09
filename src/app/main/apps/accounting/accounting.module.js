(function ()
{
    'use strict';

    angular
        .module('app.accounting',
            [
                // 3rd Party Dependencies
                'datatables',
                'flow',
                'nvd3',
                'textAngular',
                'uiGmapgoogle-maps',
                'xeditable',
				'angular-chartist'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.accounting', {
                abstract: true,
                url     : '/accounting'
            })
            
            
			.state('app.accounting.accounting', {
                url      : '/accounts',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/accounting/views/pages/accounting.html',
                        controller : 'AccountingController as vm'
                    }
                },
                resolve  : {
					DashboardData: function (msApi)
					{
						return msApi.resolve('dashboard.server@get');
					}
				},
                bodyClass: 'accounting'
            })
			
			
			.state('app.accounting.ledger-entries', {
                url      : '/ledger-entries',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/accounting/views/pages/ledger-entries.html',
                        controller : 'AccountingController as vm'
                    }
                },
                resolve  : {
					DashboardData: function (msApi)
					{
						return msApi.resolve('dashboard.server@get');
					}
				},
                bodyClass: 'accounting'
            })
			
			
			.state('app.accounting.cheque-register', {
                url      : '/cheque-register',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/accounting/views/pages/cheque-register.html',
                        controller : 'AccountingController as vm'
                    }
                },
                resolve  : {
					DashboardData: function (msApi)
					{
						return msApi.resolve('dashboard.server@get');
					}
				},
                bodyClass: 'accounting'
            })
			
			.state('app.accounting.accounting-edit', {
                url      : '/accounting-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/accounting/views/edit/accounting-edit.html',
                        controller : 'AccountingEditController as vm'
                    }
                },
                resolve  : {
					DashboardData: function (msApi)
					{
						return msApi.resolve('dashboard.server@get');
					}
				},
                bodyClass: 'accounting-edit'
            })
			
			.state('app.accounting.ledger-entries-edit', {
                url      : '/ledger-entries-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/accounting/views/edit/ledger-entries-edit.html',
                        controller : 'AccountingEditController as vm'
                    }
                },
                resolve  : {
					DashboardData: function (msApi)
					{
						return msApi.resolve('dashboard.server@get');
					}
				},
                bodyClass: 'accounting-edit'
            })
			
			.state('app.accounting.cheque-register-edit', {
                url      : '/cheque-register-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/accounting/views/edit/cheque-register-edit.html',
                        controller : 'AccountingEditController as vm'
                    }
                },
                resolve  : {
					DashboardData: function (msApi)
					{
						return msApi.resolve('dashboard.server@get');
					}
				},
                bodyClass: 'accounting-edit'
            })
			
			.state('app.accounting.accounting-view', {
                url      : '/accounting-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/accounting/views/view/accounting-view.html',
                        controller : 'AccountingViewController as vm'
                    }
                },
                resolve  : {
					DashboardData: function (msApi)
					{
						return msApi.resolve('dashboard.server@get');
					}
				},
                bodyClass: 'accounting-view'
            })
			
			.state('app.accounting.ledger-entries-view', {
                url      : '/ledger-entries-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/accounting/views/view/ledger-entries-view.html',
                        controller : 'AccountingViewController as vm'
                    }
                },
                resolve  : {
					DashboardData: function (msApi)
					{
						return msApi.resolve('dashboard.server@get');
					}
				},
                bodyClass: 'accounting-view'
            })
			
			.state('app.accounting.cheque-register-view', {
                url      : '/cheque-register-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/accounting/views/view/cheque-register-view.html',
                        controller : 'AccountingViewController as vm'
                    }
                },
                resolve  : {
					DashboardData: function (msApi)
					{
						return msApi.resolve('dashboard.server@get');
					}
				},
                bodyClass: 'accounting-view'
            })
			
			.state('app.accounting.accounting-new', {
                url      : '/accounting-new',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/accounting/views/new/accounting-new.html',
                        controller : 'AccountingNewController as vm'
                    }
                },
                resolve  : {
					DashboardData: function (msApi)
					{
						return msApi.resolve('dashboard.server@get');
					}
				},
                bodyClass: 'accounting-new'
            })
			
			.state('app.accounting.ledger-entries-new', {
                url      : '/ledger-entries-new',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/accounting/views/new/ledger-entries-new.html',
                        controller : 'AccountingNewController as vm'
                    }
                },
                resolve  : {
					DashboardData: function (msApi)
					{
						return msApi.resolve('dashboard.server@get');
					}
				},
                bodyClass: 'accounting-new'
            })
			
			.state('app.accounting.cheque-register-new', {
                url      : '/cheque-register-new',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/accounting/views/new/cheque-register-new.html',
                        controller : 'AccountingNewController as vm'
                    }
                },
                resolve  : {
					DashboardData: function (msApi)
					{
						return msApi.resolve('dashboard.server@get');
					}
				},
                bodyClass: 'accounting-new'
            })
			
			.state('app.accounting.cash_flow_report', {
                url      : '/cash_flow_report',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/accounting/views/pages/cash_flow_report.html',
                        controller : 'InvoiceController as vm'
                    }
                },
                resolve  : {
                    Invoice: function (msApi)
                    {
                        return msApi.resolve('invoice@get');
                    }
                },
                bodyClass: 'accounting'
            })
            

        // Api
		msApiProvider.register('invoice', ['app/data/invoice/invoice.json']);
		msApiProvider.register('dashboard.server', ['app/data/dashboard/server/data.json']);
		msApiProvider.register('dashboard.project', ['app/data/dashboard/project/data.json']);

        // Navigation
		
        msNavigationServiceProvider.saveItem('apps.accounting', {
            title : 'Accounting',
            icon  : 'icon-chart-pie',
			weight: 2
        });
		
		
		msNavigationServiceProvider.saveItem('apps.accounting.accounting', {
            title: 'Accounts',
            state: 'app.accounting.accounting'
        });
		
		msNavigationServiceProvider.saveItem('apps.accounting.ledger-entries', {
            title: 'Ledger Entries',
            state: 'app.accounting.ledger-entries'
        });
		
		msNavigationServiceProvider.saveItem('apps.accounting.cheque-register', {
            title: 'Cheque Register',
            state: 'app.accounting.cheque-register'
        });
		
		msNavigationServiceProvider.saveItem('apps.accounting.cash_flow_report', {
            title: 'Cash Flow Report',
            state: 'app.accounting.cash_flow_report'
        });
 
    }
})();