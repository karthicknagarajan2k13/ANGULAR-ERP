(function () {

    'use strict';

    angular.module('app.crm')


    .factory('Customer', ['$resource', function($resource){
      return $resource('https://ror-erp.herokuapp.com/customers/:id.json', {}, {
        delete: { method: 'DELETE', params: {id: '@id'} }
      });
    }])

    .factory('User', ['$resource', function($resource){
      return $resource('https://ror-erp.herokuapp.com/customers/get_customers.json', {}, {
        get_customers: { method: 'GET' , isArray: true},
      })
    }])

    .factory('Contact_User', ['$resource', function($resource){
      return $resource('https://ror-erp.herokuapp.com/contacts/get_contacts.json', {}, {
        get_contacts: { method: 'GET' , isArray: true},
      })
    }])

    .factory('Staff_User', ['$resource', function($resource){
      return $resource('https://ror-erp.herokuapp.com/users/get_users.json', {}, {
        get_users: { method: 'GET' , isArray: true},
      })
    }])

    .factory('Contact', ['$resource', function($resource){
      return $resource('https://ror-erp.herokuapp.com/contacts/:id.json', {}, {
        delete: { method: 'DELETE', params: {id: '@id'} }
      });
    }])

    .factory('Contact_form', ['$resource', function($resource){
      return $resource('https://ror-erp.herokuapp.com/contacts/edit_form.json', {}, {
        edit_form: { method: 'GET', params: {id: '@contact_id'} },
      });
    }])

    .factory('Note', ['$resource', function($resource){
      return $resource('https://ror-erp.herokuapp.com/notes/:id.json', {}, {
        show: { method: 'GET' },
        delete: { method: 'DELETE', params: {id: '@id'} }
      });
    }]);

 })();