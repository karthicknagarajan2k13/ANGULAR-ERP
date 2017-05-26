(function ()
{
    'use strict';

    angular
        .module('app.accounting',
            [
                // 3rd Party Dependencies
                'datatables',
                'flow',
                'nvd3',
                'textAngular',
                'uiGmapgoogle-maps',
                'xeditable',
				'angular-chartist'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.accounting', {
                abstract: true,
                url     : '/accounting'
            })
            
            
			.state('app.accounting.accounting', {
                url      : '/accounts',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/accounting/views/pages/accounting.html',
                        controller : 'AccountController as vm'
                    }
                },
                bodyClass: 'accounting'
            })
			
			
			.state('app.accounting.ledger-entries', {
                url      : '/ledger-entries',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/accounting/views/pages/ledger-entries.html',
                        controller : 'LedgerEntryController as vm'
                    }
                },
                bodyClass: 'accounting'
            })
			
			
			.state('app.accounting.cheque-register', {
                url      : '/cheque-register',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/accounting/views/pages/cheque-register.html',
                        controller : 'ChequeRegisterController as vm'
                    }
                },
                bodyClass: 'accounting'
            })
			
			.state('app.accounting.accounting-edit', {
                url      : '/accounting-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/accounting/views/edit/accounting-edit.html',
                        controller : 'editAccountController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'accounting-edit'
            })
			
			.state('app.accounting.ledger-entries-edit', {
                url      : '/ledger-entries-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/accounting/views/edit/ledger-entries-edit.html',
                        controller : 'editLedgerEntryController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'accounting-edit'
            })
			
			.state('app.accounting.cheque-register-edit', {
                url      : '/cheque-register-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/accounting/views/edit/cheque-register-edit.html',
                        controller : 'editChequeRegisterController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'accounting-edit'
            })
			
			.state('app.accounting.accounting-view', {
                url      : '/accounting-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/accounting/views/view/accounting-view.html',
                        controller : 'viewAccountController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'accounting-view'
            })
			
			.state('app.accounting.ledger-entries-view', {
                url      : '/ledger-entries-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/accounting/views/view/ledger-entries-view.html',
                        controller : 'viewLedgerEntryController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'accounting-view'
            })
			
			.state('app.accounting.cheque-register-view', {
                url      : '/cheque-register-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/accounting/views/view/cheque-register-view.html',
                        controller : 'viewChequeRegisterController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'accounting-view'
            })
			
			.state('app.accounting.accounting-new', {
                url      : '/accounting-new',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/accounting/views/new/accounting-new.html',
                        controller : 'newAccountController as vm'
                    }
                },
                bodyClass: 'accounting-new'
            })
			
			.state('app.accounting.ledger-entries-new', {
                url      : '/ledger-entries-new',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/accounting/views/new/ledger-entries-new.html',
                        controller : 'newLedgerEntryController as vm'
                    }
                },
                bodyClass: 'accounting-new'
            })
			
			.state('app.accounting.cheque-register-new', {
                url      : '/cheque-register-new',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/accounting/views/new/cheque-register-new.html',
                        controller : 'newChequeRegisterController as vm'
                    }
                },
                bodyClass: 'accounting-new'
            })
			
			.state('app.accounting.cash_flow_report', {
                url      : '/cash_flow_report',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/accounting/views/pages/cash_flow_report.html',
                        controller : 'InvoiceController as vm'
                    }
                },
                bodyClass: 'accounting'
            })
            
        // Navigation
		
        msNavigationServiceProvider.saveItem('apps.accounting', {
            title : 'Accounting',
            icon  : 'icon-chart-pie',
			weight: 2
        });
		
		
		msNavigationServiceProvider.saveItem('apps.accounting.accounting', {
            title: 'Accounts',
            state: 'app.accounting.accounting'
        });
		
		msNavigationServiceProvider.saveItem('apps.accounting.ledger-entries', {
            title: 'Ledger Entries',
            state: 'app.accounting.ledger-entries'
        });
		
		msNavigationServiceProvider.saveItem('apps.accounting.cheque-register', {
            title: 'Cheque Register',
            state: 'app.accounting.cheque-register'
        });
		
		msNavigationServiceProvider.saveItem('apps.accounting.cash_flow_report', {
            title: 'Cash Flow Report',
            state: 'app.accounting.cash_flow_report'
        });
 
    }
})();