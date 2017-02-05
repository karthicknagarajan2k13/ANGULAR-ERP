(function ()
{
    'use strict';

    angular
        .module('app.inventory-management',[
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
            .state('app.inventory-management', {
                abstract: true,
                url     : '/inventory-management'
            })
            
			.state('app.inventory-management.items', {
                url      : '/items',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/inventory-management/views/pages/items.html',
                        controller : 'inventoryController as vm'
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
                bodyClass: 'order-management'
            })
			
			.state('app.inventory-management.item-categories', {
                url      : '/item-categories',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/inventory-management/views/pages/item-categories.html',
                        controller : 'inventoryController as vm'
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
                bodyClass: 'order-management'
            })
			
			
			.state('app.inventory-management.suppliers', {
                url      : '/suppliers',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/inventory-management/views/pages/suppliers.html',
                        controller : 'inventoryController as vm'
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
                bodyClass: 'order-management'
            })
			
			.state('app.inventory-management.purchase-orders', {
                url      : '/purchase-orders',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/inventory-management/views/pages/purchase-orders.html',
                        controller : 'inventoryController as vm'
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
                bodyClass: 'order-management'
            })
			
			.state('app.inventory-management.sales-orders', {
                url      : '/sales-orders',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/order-management/views/pages/sales-orders.html',
                        controller : 'inventoryController as vm'
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
                bodyClass: 'order-management'
            })
			
			.state('app.inventory-management.return-wizard', {
                url      : '/return-wizard',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/order-management/views/pages/return-wizard.html',
                        controller : 'inventoryController as vm'
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
                bodyClass: 'order-management'
            })
			
			
			.state('app.inventory-management.items-edit', {
                url      : '/items-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/inventory-management/views/edit/items-edit.html',
                        controller : 'inventoryeditController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'crm'
            })
			
			.state('app.inventory-management.item-categories-edit', {
                url      : '/item-categories-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/inventory-management/views/edit/item-categories-edit.html',
                        controller : 'inventoryeditController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'crm'
            })
			
			.state('app.inventory-management.suppliers-edit', {
                url      : '/suppliers-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/inventory-management/views/edit/suppliers-edit.html',
                        controller : 'inventoryeditController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'crm'
            })
			
			.state('app.inventory-management.purchase-orders-edit', {
                url      : '/purchase-orders-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/inventory-management/views/edit/purchase-orders-edit.html',
                        controller : 'inventoryeditController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'crm'
            })
			
			.state('app.inventory-management.items-view', {
                url      : '/items-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/inventory-management/views/view/items-view.html',
                        controller : 'CustomerController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'crm'
            })
			
			.state('app.inventory-management.items-categories-view', {
                url      : '/items-categories-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/inventory-management/views/view/items-categories-view.html',
                        controller : 'CustomerController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'crm'
            })
			
			.state('app.inventory-management.suppliers-view', {
                url      : '/suppliers-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/inventory-management/views/view/suppliers-view.html',
                        controller : 'CustomerController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'crm'
            })
			
			.state('app.inventory-management.purchase-orders-view', {
                url      : '/purchase-orders-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/inventory-management/views/view/purchase-orders-view.html',
                        controller : 'CustomerController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'crm'
            })
			

        // Api
		msApiProvider.register('order-management.sales-orders', ['app/data/order-management/sales-orders.json']);
		msApiProvider.register('crm.orders', ['app/data/crm/orders.json']);
        msApiProvider.register('crm.statuses', ['app/data/crm/statuses.json']);
        // Navigation
		
        msNavigationServiceProvider.saveItem('apps.inventory-management', {
            title : 'Inventory Management',
            icon  : 'icon-clipboard-text',
            weight: 2
        });
		
		msNavigationServiceProvider.saveItem('apps.inventory-management.items', {
            title: 'Items',
            state: 'app.inventory-management.items'
        });
		
		msNavigationServiceProvider.saveItem('apps.inventory-management.item-categories', {
            title: 'Item Categories',
            state: 'app.inventory-management.item-categories'
        });
		
		msNavigationServiceProvider.saveItem('apps.inventory-management.suppliers', {
            title: 'Suppliers',
            state: 'app.inventory-management.suppliers'
        });
		
		msNavigationServiceProvider.saveItem('apps.inventory-management.purchase-orders', {
            title: 'Purchase Orders',
            state: 'app.inventory-management.purchase-orders'
        });
		
		msNavigationServiceProvider.saveItem('apps.inventory-management.sales-orders', {
            title: 'Sales Orders',
            state: 'app.inventory-management.sales-orders'
        });
		
		msNavigationServiceProvider.saveItem('apps.inventory-management.return-wizard', {
            title: 'Return Wizard',
            state: 'app.inventory-management.return-wizard'
        });
		
		
    }
})();