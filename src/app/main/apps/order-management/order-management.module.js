(function ()
{
    'use strict';

    angular
        .module('app.order-management',[
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
            .state('app.order-management', {
                abstract: true,
                url     : '/order-management'
            })
            
			.state('app.order-management.sales-orders', {
                url      : '/sales-orders',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/order-management/views/pages/sales-orders.html',
                        controller : 'SalesOrdersController as vm'
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
			
			.state('app.order-management.invoices', {
                url      : '/invoices',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/order-management/views/pages/invoices.html',
                        controller : 'SalesOrdersController as vm'
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
			
			.state('app.order-management.return-wizard', {
                url      : '/return-wizard',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/order-management/views/pages/return-wizard.html',
                        controller : 'SalesOrdersController as vm'
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
			
			
			.state('app.order-management.sales-order-edit', {
                url      : '/sales-order-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/order-management/views/edit/sales-order-edit.html',
                        controller : 'SalesOrderseditController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'order-management'
            })
			
			.state('app.order-management.invoices-edit', {
                url      : '/invoices-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/order-management/views/edit/invoices-edit.html',
                        controller : 'SalesOrderseditController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'order-management'
            })
			
			
			.state('app.order-management.sales-order-view', {
                url      : '/sales-order-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/order-management/views/view/sales-order-view.html',
                        controller : 'SalesOrdersviewController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'order-management'
            })
			
			.state('app.order-management.invoices-view', {
                url      : '/invoices-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/order-management/views/view/invoices-view.html',
                        controller : 'SalesOrdersviewController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'order-management'
            })
			
			

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/apps/order-management');

        // Api
		msApiProvider.register('order-management.sales-orders', ['app/data/order-management/sales-orders.json']);
        // Navigation
		
        msNavigationServiceProvider.saveItem('apps.order-management', {
            title : 'Order Management',
            icon  : 'icon-sitemap',
            weight: 2
        });
		
		msNavigationServiceProvider.saveItem('apps.order-management.sales-orders', {
            title: 'Sales Orders',
            state: 'app.order-management.sales-orders'
        });
		
		msNavigationServiceProvider.saveItem('apps.order-management.invoices', {
            title: 'Invoices',
            state: 'app.order-management.invoices'
        });
		
		msNavigationServiceProvider.saveItem('apps.order-management.return-wizard', {
            title: 'Return Wizard',
            state: 'app.order-management.return-wizard'
        });
		
    }
})();