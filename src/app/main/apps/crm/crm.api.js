(function ()
{
    'use strict';

    angular
        .module('app.crm')
        .factory('crmApi', apiService);

    /** @ngInject */
    function apiService($resource,$http)
    {
        var api = {};

        // Base Url
        api.baseUrl = 'https://ror-erp.herokuapp.com/';

        api.createCustomer = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"customers.json"}).then(function(result){
               return result.data;
           });
        };
        api.updateCustomer = function(id,data) {
           return $http({data: data, method:"PUT", url: api.baseUrl+"customers/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.createContact = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"contacts.json"}).then(function(result){
               return result.data;
           });
        };
        api.updateContact = function(id,data) {
           return $http({data: data, method:"PUT", url: api.baseUrl+"contacts/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.createNote = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"notes.json"}).then(function(result){
               return result.data;
           });
        };
        api.updateNote = function(id,data) {
           return $http({data: data, method:"PUT", url: api.baseUrl+"notes/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.editCustomer = function(data) {
           return $http({method:"GET", url: api.baseUrl+"customers/edit_form.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.getCustomers = function(data) {
           return $http({method:"GET", url: api.baseUrl+"customers.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.getContacts = function(data) {
           return $http({method:"GET", url: api.baseUrl+"contacts.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.getNotes = function(data) {
           return $http({method:"GET", url: api.baseUrl+"notes.json",params: data}).then(function(result){
               return result.data;
           });
        };

        api.deleteAllCustomer = function(data) {
           return $http({method:"GET", url: api.baseUrl+"customers/delete_all.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.deleteAllContact = function(data) {
           return $http({method:"GET", url: api.baseUrl+"contacts/delete_all.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.deleteAllNote = function(data) {
           return $http({method:"GET", url: api.baseUrl+"notes/delete_all.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.viewCustomer = function(id) {
           return $http({method:"GET", url: api.baseUrl+"customers/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.viewContact = function(id) {
           return $http({method:"GET", url: api.baseUrl+"contacts/"+id+".json"}).then(function(result){
               return result.data;
           });
        };

        return api;
    }

})();