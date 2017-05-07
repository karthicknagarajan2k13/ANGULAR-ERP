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
                        controller : 'WarehouseLocationController as vm'
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
                        controller : 'WareHouseController as vm'
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
                        controller : 'editWarehouseLocationController as vm'
                    }
                },
                params: {
                 obj: null
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('e-commerce.product@get');
                    }
                },
                bodyClass: 'warehouse-management'
            })

            .state('app.warehouse-management.stock-locations-new', {
                url      : '/stock-locations-new',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/warehouse-management/views/new/stock-locations-new.html',
                        controller : 'newWarehouseLocationController as vm'
                    }
                },
                params: {
                 warehouse_id: null
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('e-commerce.product@get');
                    }
                },
                bodyClass: 'warehouse-management'
            })

			.state('app.warehouse-management.warehouse-edit', {
                url      : '/warehouse-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/warehouse-management/views/edit/warehouse-edit.html',
                        controller : 'editWarehouseController as vm'
                    }
                },
                params: {
                 obj: null
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'warehouse-management'
            })

            .state('app.warehouse-management.warehouse-new', {
                url      : '/warehouse-new',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/warehouse-management/views/new/warehouse-new.html',
                        controller : 'newWarehouseController as vm'
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
                        controller : 'viewWarehouseLocationController as vm'
                    }
                },
                params: {
                 obj: null
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
                        controller : 'viewWarehouseController as vm'
                    }
                },
                params: {
                 obj: null
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
		msApiProvider.register('e-commerce.product', ['app/data/e-commerce/product.json']);
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