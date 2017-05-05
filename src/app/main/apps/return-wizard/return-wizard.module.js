(function ()
{
    'use strict';

    angular
        .module('app.return-wizard',
            [
                // 3rd Party Dependencies
                'datatables',
                'flow',
                'nvd3',
                'textAngular',
                'uiGmapgoogle-maps',
                'xeditable'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.return-wizard', {
                abstract: true,
                url     : '/return-wizard'
            })
            
            
			.state('app.return-wizard.return-wizard', {
                url      : '/return-wizard',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/return-wizard/views/pages/return-wizard.html',
                        controller : 'ReturnWizardController as vm'
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
			
			
			
			
			.state('app.return-wizard.return-wizard-edit', {
                url      : '/return-wizard-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/return-wizard/views/edit/return-wizard-edit.html',
                        controller : 'ReturnWizardEditController as vm'
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
			
			
			
			.state('app.return-wizard.return-wizard-view', {
                url      : '/return-wizard-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/return-wizard/views/view/return-wizard-view.html',
                        controller : 'ReturnWizardViewController as vm'
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
			
		
			
			.state('app.return-wizard.return-wizard-new', {
                url      : '/return-wizard-new',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/return-wizard/views/new/return-wizard-new.html',
                        controller : 'ReturnWizardNewController as vm'
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
			
			

        // Api
		msApiProvider.register('dashboard.server', ['app/data/dashboard/server/data.json']);
		msApiProvider.register('dashboard.project', ['app/data/dashboard/project/data.json']);

        // Navigation
		
        msNavigationServiceProvider.saveItem('apps.return-wizard', {
            title : 'Return Wizard',
            icon  : 'icon-chart-pie',
			weight: 2
        });
		
		
		msNavigationServiceProvider.saveItem('apps.return-wizard.return-wizard', {
            title: 'Returns',
            state: 'app.return-wizard.return-wizard'
        });
		
		/* msNavigationServiceProvider.saveItem('apps.accounting.ledger-entries', {
            title: 'Ledger Entries',
            state: 'app.accounting.ledger-entries'
        });
		
		msNavigationServiceProvider.saveItem('apps.accounting.cheque-register', {
            title: 'Cheque Register',
            state: 'app.accounting.cheque-register'
        }); */
		
		/* msNavigationServiceProvider.saveItem('apps.accounting.accounting-edit', {
            title: 'Accounting Edit',
            state: 'app.accounting.accounting-edit'
        }); */
 
    }
})();