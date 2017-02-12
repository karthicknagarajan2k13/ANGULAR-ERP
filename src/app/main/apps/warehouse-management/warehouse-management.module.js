(function ()
{
    'use strict';

    angular
        .module('app.warehouse-management',[
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
            .state('app.warehouse-management', {
                abstract: true,
                url     : '/warehouse-management'
            })
			
			.state('app.warehouse-management.stock-locations', {
                url      : '/stock-locations',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/warehouse-management/views/pages/stock-locations.html',
                        controller : 'warehouseController as vm'
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
                bodyClass: 'warehouse-management'
            })
			
			.state('app.warehouse-management.warehouse', {
                url      : '/warehouse',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/warehouse-management/views/pages/warehouse.html',
                        controller : 'warehouseController as vm'
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
                bodyClass: 'warehouse-management'
            })
			
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
			
        // Api
		msApiProvider.register('order-management.sales-orders', ['app/data/order-management/sales-orders.json']);
		msApiProvider.register('crm.orders', ['app/data/crm/orders.json']);
        msApiProvider.register('crm.statuses', ['app/data/crm/statuses.json']);
        // Navigation
		
        msNavigationServiceProvider.saveItem('apps.warehouse-management', {
            title : 'Warehouse Management',
            icon  : 'icon-truck',
            weight: 2
        });
		
		msNavigationServiceProvider.saveItem('apps.warehouse-management.stock-locations', {
            title: 'Stock Locations',
            state: 'app.warehouse-management.stock-locations'
        });
		
		msNavigationServiceProvider.saveItem('apps.warehouse-management.warehouse', {
            title: 'Warehouse',
            state: 'app.warehouse-management.warehouse'
        });
		
		
    }
})();