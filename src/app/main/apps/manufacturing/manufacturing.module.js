(function ()
{
    'use strict';

    angular
        .module('app.manufacturing',[
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
            .state('app.manufacturing', {
                abstract: true,
                url     : '/manufacturing-management'
            })
			
			.state('app.manufacturing.manufacturing', {
                url      : '/manufacturing',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/manufacturing/views/pages/manufacturing.html',
                        controller : 'ManufacturingController as vm'
                    }
                },
                bodyClass: 'manufacturing'
            })
			 
			.state('app.manufacturing.materials', {
                url      : '/materials',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/manufacturing/views/pages/materials.html',
                        controller : 'MaterialController as vm'
                    }
                },
                bodyClass: 'manufacturing'
            })
			
			.state('app.manufacturing.manufacturing-edit', {
                url      : '/manufacturing-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/manufacturing/views/edit/manufacturing-edit.html',
                        controller : 'editManufacturingController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'warehouse-management'
            })

            .state('app.manufacturing.manufacturing-new', {
                url      : '/manufacturing-new',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/manufacturing/views/new/manufacturing-new.html',
                        controller : 'newManufacturingController as vm'
                    }
                },
                bodyClass: 'warehouse-management'
            })

			.state('app.manufacturing.materials-edit', {
                url      : '/materials-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/manufacturing/views/edit/materials-edit.html',
                        controller : 'editMaterialController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'warehouse-management'
            })

            .state('app.manufacturing.materials-new', {
                url      : '/materials-new',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/manufacturing/views/new/materials-new.html',
                        controller : 'newMaterialController as vm'
                    }
                },
                bodyClass: 'warehouse-management'
            })

			.state('app.manufacturing.manufacturing-view', {
                url      : '/manufacturing-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/manufacturing/views/view/manufacturing-view.html',
                        controller : 'viewManufacturingController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'warehouse'
            })
			
			.state('app.manufacturing.materials-view', {
                url      : '/materials-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/manufacturing/views/view/materials-view.html',
                        controller : 'viewMaterialController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'warehouse'
            })
		
        msNavigationServiceProvider.saveItem('apps.manufacturing', {
            title : 'Manufacturing Management',
            icon  : 'icon-factory',
            weight: 2
        });
		
		msNavigationServiceProvider.saveItem('apps.manufacturing.manufacturing', {
            title: 'Manufacturing',
            state: 'app.manufacturing.manufacturing'
        });
		
		msNavigationServiceProvider.saveItem('apps.manufacturing.materials', {
            title: 'Materials',
            state: 'app.manufacturing.materials'
        }); 
		
		
    }
})();