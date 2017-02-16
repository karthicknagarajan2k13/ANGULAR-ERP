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
			/*
			.state('app.warehouse-management.stock-locations-edit', {
                url      : '/stock-locations-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/warehouse-management/views/edit/stock-locations-edit.html',
                        controller : 'warehouseeditController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'warehouse-management'
            })
			
			.state('app.warehouse-management.warehouse-edit', {
                url      : '/warehouse-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/warehouse-management/views/edit/warehouse-edit.html',
                        controller : 'warehouseeditController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'warehouse-management'
            })
			
			.state('app.warehouse-management.stock-locations-view', {
                url      : '/stock-locations-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/warehouse-management/views/view/stock-locations-view.html',
                        controller : 'warehouseviewController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'warehouse'
            })
			
			.state('app.warehouse-management.warehouse-view', {
                url      : '/warehouse-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/warehouse-management/views/view/warehouse-view.html',
                        controller : 'warehouseviewController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'warehouse'
            })
			 */
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