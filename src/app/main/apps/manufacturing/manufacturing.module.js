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
                        controller : 'manufacturingController as vm'
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
                bodyClass: 'manufacturing'
            })
			 
			.state('app.manufacturing.materials', {
                url      : '/materials',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/manufacturing/views/pages/materials.html',
                        controller : 'manufacturingController as vm'
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
                bodyClass: 'manufacturing'
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
		
        msNavigationServiceProvider.saveItem('apps.manufacturing', {
            title : 'Manufacturing Management',
            icon  : 'icon-truck',
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