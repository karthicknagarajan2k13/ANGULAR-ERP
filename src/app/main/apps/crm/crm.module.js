(function ()
{
    'use strict';

    angular
        .module('app.crm',
            [
                // 3rd Party Dependencies
                'datatables',
                'flow',
                'nvd3',
                'textAngular',
                'uiGmapgoogle-maps',
                'xeditable',
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.crm', {
                abstract: true,
                url     : '/crm'
            })
            
            
			.state('app.crm.customers', {
                url      : '/customers',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/crm/views/customers/customers.html',
                        controller : 'customerssController as vm'
                    }
                },
                loginRequired : true,
                resolve  : {
                    Orders  : function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    },
                    Statuses: function (msApi)
                    {
                        return msApi.resolve('crm.statuses@get');
                    }
                },
                bodyClass: 'crm'
            })
			
			
            .state('app.crm.customer-detail-edit', {
                url      : '/customer-detail-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/crm/views/edit/customer-detail-edit.html',
                        controller : 'EditCustomerController as vm'
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
                bodyClass: 'crm'
            })

            .state('app.crm.customer-detail-new', {
                url      : '/customer-detail-new',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/crm/views/new/customer-detail-new.html',
                        controller : 'NewCustomerController as vm'
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
                bodyClass: 'crm'
            })		
			
			.state('app.crm.contact-detail-edit', {
                url      : '/contact-detail-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/crm/views/edit/contact-detail-edit.html',
                        controller : 'EditContactController as vm'
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
                bodyClass: 'crm'
            })

            .state('app.crm.contact-detail-new', {
                url      : '/contact-detail-new',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/crm/views/new/contact-detail-new.html',
                        controller : 'NewContactController as vm'
                    }
                },
                params: {
                 customer_id: null
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'crm'
            })

			.state('app.crm.note-detail-edit', {
                url      : '/note-detail-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/crm/views/edit/note-detail-edit.html',
                        controller : 'EditNoteController as vm'
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
                bodyClass: 'crm'
            })
			
            .state('app.crm.note-detail-new', {
                url      : '/note-detail-new',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/crm/views/new/note-detail-new.html',
                        controller : 'NewNoteController as vm'
                    }
                },
                params: {
                 customer_id: null,
                 contact_id: null
                },
                resolve  : {
                    Product: function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    }
                },
                bodyClass: 'crm'
            })

			.state('app.crm.customer-detail-view', {
                url      : '/customer-detail-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/crm/views/view/customer-detail-view.html',
                        controller : 'CustomerController as vm'
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
                bodyClass: 'crm'
            })
			
			.state('app.crm.note-detail-view', {
                url      : '/note-detail-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/crm/views/view/note-detail-view.html',
                        controller : 'ViewNoteController as vm'
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
                bodyClass: 'crm'
            })
			
			
			.state('app.crm.contact-detail-view', {
                url      : '/contact-detail-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/crm/views/view/contact-detail-view.html',
                        controller : 'ViewContactController as vm'
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
                bodyClass: 'crm'
            })
			
			.state('app.crm.contacts', {
                url      : '/contacts',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/crm/views/contacts/contacts.html',
                        controller : 'contactsController as vm'
                    }
                },
                resolve  : {
                    Orders  : function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    },
                    Statuses: function (msApi)
                    {
                        return msApi.resolve('crm.statuses@get');
                    }
                },
                bodyClass: 'crm'
            })
			
			.state('app.crm.notes', {
                url      : '/notes',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/crm/views/notes/notes.html',
                        controller : 'notesController as vm'
                    }
                },
                resolve  : {
                    Orders  : function (msApi)
                    {
                        return msApi.resolve('crm.orders@get');
                    },
                    Statuses: function (msApi)
                    {
                        return msApi.resolve('crm.statuses@get');
                    }
                },
                bodyClass: 'crm'
            })
			
            

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/apps/crm');

        // Api
        msApiProvider.register('crm.orders', ['app/data/crm/orders.json']);
        msApiProvider.register('crm.statuses', ['app/data/crm/statuses.json']);

        // Navigation
		msNavigationServiceProvider.saveItem('apps', {
            title : 'Menu',
            group : true,
            weight: 1
        });
		
        msNavigationServiceProvider.saveItem('apps.crm', {
            title : 'CRM',
            icon  : 'icon-chart-pie',
            weight: 2
        });
		
		msNavigationServiceProvider.saveItem('apps.crm.customers', {
            title: 'Customers',
            state: 'app.crm.customers'
        });
		
		msNavigationServiceProvider.saveItem('apps.crm.contacts', {
            title: 'Contacts',
            state: 'app.crm.contacts'
        });
		
		msNavigationServiceProvider.saveItem('apps.crm.notes', {
            title: 'Notes',
            state: 'app.crm.notes'
        });
 
    }
})();