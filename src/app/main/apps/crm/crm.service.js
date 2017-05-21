(function () {

    'use strict';

    angular.module('app.crm')


    .factory('Customer', ['$resource', function($resource){
      return $resource('http://localhost:8000/customers/:id.json', {}, {
        delete: { method: 'DELETE', params: {id: '@id'} }
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

    .factory('Contact', ['$resource', function($resource){
      return $resource('http://localhost:8000/contacts/:id.json', {}, {
        delete: { method: 'DELETE', params: {id: '@id'} }
      });
    }])

    .factory('Contact_form', ['$resource', function($resource){
      return $resource('http://localhost:8000/contacts/edit_form.json', {}, {
        edit_form: { method: 'GET', params: {id: '@contact_id'} },
      });
    }])

    .factory('Note', ['$resource', function($resource){
      return $resource('http://localhost:8000/notes/:id.json', {}, {
        show: { method: 'GET' },
        delete: { method: 'DELETE', params: {id: '@id'} }
      });
    }]);

 })();