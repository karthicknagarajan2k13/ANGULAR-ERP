(function ()
{
    'use strict';

    angular
        .module('app.knowledge-base',[
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
            .state('app.knowledge-base', {
                abstract: true,
                url     : '/knowledge-base'
            })
			
			.state('app.knowledge-base.kb-categories', {
                url      : '/kb-categories',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/knowledge-base/views/pages/kb-categories.html',
                        controller : 'kbController as vm'
                    }
                },
                resolve  : {
                    Orders  : function (msApi)
                    {
                        return msApi.resolve('order-management.sales-orders@get');
                    },
                    Statuses: function (msApi)
                    {
                        return msApi.resolve('order-management.sales-orders@get');
                    }
                },
                bodyClass: 'knowledge-base'
            })
			 
			.state('app.knowledge-base.knowledge-base', {
                url      : '/knowledge-base',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/knowledge-base/views/pages/knowledge-base.html',
                        controller : 'kbController as vm'
                    }
                },
                resolve  : {
                    Orders  : function (msApi)
                    {
                        return msApi.resolve('order-management.sales-orders@get');
                    },
                    Statuses: function (msApi)
                    {
                        return msApi.resolve('order-management.sales-orders@get');
                    }
                },
                bodyClass: 'knowledge-base'
            })
			
			.state('app.knowledge-base.kb-categories-edit', {
                url      : '/kb-categories-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/knowledge-base/views/edit/kb-categories-edit.html',
                        controller : 'kbeditController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'kb'
            })
			
			.state('app.knowledge-base.knowledge-base-edit', {
                url      : '/knowledge-base-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/knowledge-base/views/edit/knowledge-base-edit.html',
                        controller : 'kbeditController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'kb'
            })
			
			.state('app.knowledge-base.kb-categories-view', {
                url      : '/kb-categories-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/knowledge-base/views/view/kb-categories-view.html',
                        controller : 'kbviewController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'kb'
            })
			
			.state('app.knowledge-base.knowledge-base-view', {
                url      : '/knowledge-base-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/knowledge-base/views/view/knowledge-base-view.html',
                        controller : 'kbviewController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'kb'
            })
			 
        // Api
		msApiProvider.register('order-management.sales-orders', ['app/data/order-management/sales-orders.json']);
		msApiProvider.register('crm.orders', ['app/data/crm/orders.json']);
        msApiProvider.register('crm.statuses', ['app/data/crm/statuses.json']);
        // Navigation
		
        msNavigationServiceProvider.saveItem('apps.knowledge-base', {
            title : 'Knowledge Base',
            icon  : 'icon-question-mark-circle',
            weight: 2
        });
		
		msNavigationServiceProvider.saveItem('apps.knowledge-base.kb-categories', {
            title: 'KB Categories',
            state: 'app.knowledge-base.kb-categories'
        });
		
		msNavigationServiceProvider.saveItem('apps.knowledge-base.knowledge-base', {
            title: 'Knowledge Base',
            state: 'app.knowledge-base.knowledge-base'
        }); 
		
		
    }
})();