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
                        controller : 'SalesOrderController as vm'
                    }
                },
                bodyClass: 'order-management'
            })
			
			.state('app.order-management.invoices', {
                url      : '/invoices',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/order-management/views/pages/invoices.html',
                        controller : 'SalesOrderInvoicesController as vm'
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
                bodyClass: 'order-management'
            })
			
			.state('app.order-management.etsy', {
                url      : '/etsy',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/order-management/views/pages/etsy.html',
                        controller : 'AccountConnectedController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'order-management'
            })
			
			.state('app.order-management.shopify', {
                url      : '/shopify',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/order-management/views/pages/shopify.html',
                        controller : 'AccountConnectedController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'order-management'
            })
			
			.state('app.order-management.amazon', {
                url      : '/amazon',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/order-management/views/pages/amazon.html',
                        controller : 'AccountConnectedController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'order-management'
            })
			
			.state('app.order-management.ebay', {
                url      : '/ebay',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/order-management/views/pages/ebay.html',
                        controller : 'AccountConnectedController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'order-management'
            })
			
			.state('app.order-management.acc', {
                url      : '/connected-accounts',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/order-management/views/pages/connected-accounts.html',
                        controller : 'ConnectedAccountsController as vm'
                    }
                },
                bodyClass: 'order-management'
            })
			
			
			.state('app.order-management.sales-order-edit', {
                url      : '/sales-order-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/order-management/views/edit/sales-order-edit.html',
                        controller : 'SalesOrdersEditController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'order-management'
            })
			
			.state('app.order-management.invoices-new', {
                url      : '/invoices-new',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/order-management/views/new/invoices-new.html',
                        controller : 'NewSalesOrdersInvoicesController as vm'
                    }
                },
                bodyClass: 'order-management'
            })
            .state('app.order-management.invoices-edit', {
                url      : '/invoices-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/order-management/views/edit/invoices-edit.html',
                        controller : 'SalesOrdersInvoiceEditController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'order-management'
            })			
			
			.state('app.order-management.sales-order-view', {
                url      : '/sales-order-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/order-management/views/view/sales-order-view.html',
                        controller : 'viewSalesOrdersController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'order-management'
            })
			
			.state('app.order-management.invoices-view', {
                url      : '/invoices-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/order-management/views/view/invoices-view.html',
                        controller : 'viewSalesOrderInvoiceController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'order-management'
            })
			
			

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/apps/order-management');

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
		
		msNavigationServiceProvider.saveItem('apps.order-management.acc', {
            title: 'Connected Accounts',
            state: 'app.order-management.acc'
        });
		
    }
})();