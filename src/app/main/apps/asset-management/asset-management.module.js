(function ()
{
    'use strict';

    angular
        .module('app.asset-management',[
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
            .state('app.asset-management', {
                abstract: true,
                url     : '/asset-management'
            })
			
			.state('app.asset-management.asset', {
                url      : '/asset',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/asset-management/views/pages/asset.html',
                        controller : 'AssetController as vm'
                    }
                },
                bodyClass: 'knowledge-base'
            }) 
			 
			 .state('app.asset-management.maintanance', {
                url      : '/maintanance',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/asset-management/views/pages/maintanance.html',
                        controller : 'MaintananceController as vm'
                    }
                },
                bodyClass: 'knowledge-base'
            })
			
			.state('app.asset-management.asset-edit', {
                url      : '/asset-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/asset-management/views/edit/asset-edit.html',
                        controller : 'editAssetController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'kb'
            })

              .state('app.asset-management.asset-new', {
                url      : '/asset-new',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/asset-management/views/new/asset-new.html',
                        controller : 'newAssetController as vm'
                    }
                },
                bodyClass: 'kb'
            })

			.state('app.asset-management.maintanance-edit', {
                url      : '/maintanance-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/asset-management/views/edit/maintanance-edit.html',
                        controller : 'editMaintananceController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'kb'
            })

            .state('app.asset-management.maintanance-new', {
                url      : '/maintanance-new',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/asset-management/views/new/maintanance-new.html',
                        controller : 'newMaintananceController as vm'
                    }
                },
                params: {
                 asset_id: null,
                },
                bodyClass: 'kb'
            })

			.state('app.asset-management.asset-view', {
                url      : '/asset-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/asset-management/views/view/asset-view.html',
                        controller : 'viewAssetController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'kb'
            })
			
			.state('app.asset-management.maintanance-view', {
                url      : '/maintanance-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/asset-management/views/view/maintanance-view.html',
                        controller : 'viewMaintananceController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'kb'
            }) 
			 
        // Navigation
		
        msNavigationServiceProvider.saveItem('apps.asset-management', {
            title : 'Asset Management',
            icon  : 'icon-checkbox-multiple-marked-outline',
            weight: 2
        });
		
		msNavigationServiceProvider.saveItem('apps.asset-management.asset', {
            title: 'Asset',
            state: 'app.asset-management.asset'
        });
		
		msNavigationServiceProvider.saveItem('apps.asset-management.maintanance', {
            title: 'Maintenance Service',
            state: 'app.asset-management.maintanance'
        }); 
		
		
    }
})();