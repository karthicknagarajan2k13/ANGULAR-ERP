(function ()
{
    'use strict';

    angular
        .module('app.hr',[
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
            .state('app.hr', {
                abstract: true,
                url     : '/hr'
            })
			
			.state('app.hr.employees', {
                url      : '/employees',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/hr/views/pages/employees.html',
                        controller : 'hrController as vm'
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
                bodyClass: 'hr'
            })
			
			.state('app.hr.payrolls', {
                url      : '/payrolls',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/hr/views/pages/payrolls.html',
                        controller : 'hrController as vm'
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
                bodyClass: 'hr'
            })
			
			.state('app.hr.expenses', {
                url      : '/expenses',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/hr/views/pages/expenses.html',
                        controller : 'hrController as vm'
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
                bodyClass: 'hr'
            })
			
			.state('app.hr.timeclock', {
                url      : '/timeclock',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/hr/views/pages/timeclock.html',
                        controller : 'hrController as vm'
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
                bodyClass: 'hr'
            })
			
			.state('app.hr.payroll-report', {
                url      : '/payroll-report',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/hr/views/pages/payroll-report.html',
                        controller : 'hrController as vm'
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
                bodyClass: 'hr'
            })
			
			.state('app.hr.expenses-report', {
                url      : '/expenses-report',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/hr/views/pages/expenses-report.html',
                        controller : 'hrController as vm'
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
                bodyClass: 'hr'
            })
			
			.state('app.hr.sales-report', {
                url      : '/sales-report',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/hr/views/pages/sales-report.html',
                        controller : 'hrController as vm'
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
                bodyClass: 'hr'
            })
			
			.state('app.hr.employees-edit', {
                url      : '/employees-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/hr/views/edit/employees-edit.html',
                        controller : 'hreditController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'hr'
            })
			
			.state('app.hr.timeclock-edit', {
                url      : '/timeclock-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/hr/views/edit/timeclock-edit.html',
                        controller : 'hreditController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'hr'
            })
			
			.state('app.hr.expenses-edit', {
                url      : '/expenses-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/hr/views/edit/expenses-edit.html',
                        controller : 'hreditController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'hr'
            })
			.state('app.hr.payroll-edit', {
                url      : '/payroll-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/hr/views/edit/payroll-edit.html',
                        controller : 'hreditController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'hr'
            })
			
			.state('app.hr.employees-view', {
                url      : '/employees-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/hr/views/view/employees-view.html',
                        controller : 'hrviewController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'hr'
            })
			
			.state('app.hr.timeclock-view', {
                url      : '/timeclock-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/hr/views/view/timeclock-view.html',
                        controller : 'hrviewController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'hr'
            })
			
			.state('app.hr.expenses-view', {
                url      : '/expenses-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/hr/views/view/expenses-view.html',
                        controller : 'hrviewController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'hr'
            })
			
			.state('app.hr.payroll-view', {
                url      : '/payroll-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/hr/views/view/payroll-view.html',
                        controller : 'hrviewController as vm'
                    }
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'hr'
            })

        // Api
		msApiProvider.register('order-management.sales-orders', ['app/data/order-management/sales-orders.json']);
		msApiProvider.register('crm.orders', ['app/data/crm/orders.json']);
        msApiProvider.register('crm.statuses', ['app/data/crm/statuses.json']);
        // Navigation
		
        msNavigationServiceProvider.saveItem('apps.hr', {
            title : 'HR',
            icon  : 'icon-account-check',
            weight: 2
        });
		
		msNavigationServiceProvider.saveItem('apps.hr.employees', {
            title: 'Employees',
            state: 'app.hr.employees'
        });
		
		msNavigationServiceProvider.saveItem('apps.hr.payrolls', {
            title: 'Payrolls',
            state: 'app.hr.payrolls'
        });
		
		msNavigationServiceProvider.saveItem('apps.hr.expenses', {
            title: 'Expenses',
            state: 'app.hr.expenses'
        });
		
		msNavigationServiceProvider.saveItem('apps.hr.timeclock', {
            title: 'TimeClock',
            state: 'app.hr.timeclock'
        });
		
		msNavigationServiceProvider.saveItem('apps.hr.payroll-report', {
            title: 'Payroll Report',
            state: 'app.hr.payroll-report'
        });
		
		msNavigationServiceProvider.saveItem('apps.hr.expenses-report', {
            title: 'Expenses Report',
            state: 'app.hr.expenses-report'
        });
		
		msNavigationServiceProvider.saveItem('apps.hr.sales-report', {
            title: 'Sales Report',
            state: 'app.hr.sales-report'
        });
		
    }
})();