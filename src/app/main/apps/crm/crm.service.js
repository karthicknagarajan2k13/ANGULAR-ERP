(function () {

    'use strict';

    angular.module('app.crm')

    .factory('Customers', ['$resource',function($resource){
      return $resource('http://localhost:8000/customers.json', {},{
        query: { method: 'GET', isArray: true}
      })
    }])

    .factory('CustomerDeleteAll', ['$resource',function($resource){
      return $resource('http://localhost:8000/customers/delete_all.json', {},{
        delete_all: { method: 'GET', isArray: true},
      })
    }])

    .factory('ContactDeleteAll', ['$resource',function($resource){
      return $resource('http://localhost:8000/contacts/delete_all.json', {},{
        delete_all: { method: 'GET', isArray: true},
      })
    }])

    .factory('NoteDeleteAll', ['$resource',function($resource){
      return $resource('http://localhost:8000/notes/delete_all.json', {},{
        delete_all: { method: 'GET', isArray: true},
      })
    }])

    .factory('Customer', ['$resource', function($resource){
      return $resource('http://localhost:8000/customers/:id.json', {}, {
        show: { method: 'GET' },
        delete: { method: 'DELETE', params: {id: '@id'} }
      });
    }])

    .factory('Customer_form', ['$resource', function($resource){
      return $resource('http://localhost:8000/customers/edit_form.json', {}, {
        edit_form: { method: 'GET', params: {id: '@customer_id'} },
      });
    }])

    .factory('User', ['$resource', function($resource){
      return $resource('http://localhost:8000/customers/get_customers.json', {}, {
        get_customers: { method: 'GET' , isArray: true},
      })
    }])

    .factory('Contact_User', ['$resource', function($resource){
      return $resource('http://localhost:8000/contacts/get_contacts.json', {}, {
        get_contacts: { method: 'GET' , isArray: true},
      })
    }])

    .factory('Staff_User', ['$resource', function($resource){
      return $resource('http://localhost:8000/users/get_users.json', {}, {
        get_users: { method: 'GET' , isArray: true},
      })
    }])

    .factory('Contacts', ['$resource',function($resource){
      return $resource('http://localhost:8000/contacts.json', {},{
        query: { method: 'GET', isArray: true}
      })
    }])

    .factory('Contact', ['$resource', function($resource){
      return $resource('http://localhost:8000/contacts/:id.json', {}, {
        show: { method: 'GET' },
        delete: { method: 'DELETE', params: {id: '@id'} }
      });
    }])

    .factory('Contact_form', ['$resource', function($resource){
      return $resource('http://localhost:8000/contacts/edit_form.json', {}, {
        edit_form: { method: 'GET', params: {id: '@contact_id'} },
      });
    }])

    .factory('Notes', ['$resource',function($resource){
      return $resource('http://localhost:8000/notes.json', {},{
        query: { method: 'GET', isArray: true},
      })
    }])

    .factory('Note', ['$resource', function($resource){
      return $resource('http://localhost:8000/notes/:id.json', {}, {
        show: { method: 'GET' },
        delete: { method: 'DELETE', params: {id: '@id'} }
      });
    }]);

 })();