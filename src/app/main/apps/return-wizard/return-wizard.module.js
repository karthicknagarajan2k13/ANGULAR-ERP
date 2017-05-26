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
                bodyClass: 'accounting'
            })
			
			
			
			
			.state('app.return-wizard.return-wizard-edit', {
                url      : '/return-wizard-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/return-wizard/views/edit/return-wizard-edit.html',
                        controller : 'editReturnWizardController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'accounting-edit'
            })
			
			
			
			.state('app.return-wizard.return-wizard-view', {
                url      : '/return-wizard-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/return-wizard/views/view/return-wizard-view.html',
                        controller : 'viewReturnWizardController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'accounting-view'
            })
			
		
			
			.state('app.return-wizard.return-wizard-new', {
                url      : '/return-wizard-new',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/return-wizard/views/new/return-wizard-new.html',
                        controller : 'newReturnWizardController as vm'
                    }
                },
                bodyClass: 'accounting-new'
            })
			
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
    }
})();