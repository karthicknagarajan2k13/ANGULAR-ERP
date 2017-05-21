(function ()
{
    'use strict';

    angular
        .module('app.return-wizard')
        .factory('rwApi', apiService);

    /** @ngInject */
    function apiService($resource,$q,$http)
    {
        var api = {};

        // Base Url
        api.baseUrl = 'https://erp-rails.herokuapp.com/';

        api.getUsers = function() {
           return $http({method:"GET", url: api.baseUrl+"users/get_users.json"}).then(function(result){
               return result.data;
           });
        };

        api.createReturnWizard = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"return_wizards.json"}).then(function(result){
               return result.data;
           });
        };
        api.getReturnWizards = function(data) {
           return $http({method:"GET", url: api.baseUrl+"return_wizards.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.deleteAllReturnWizard = function(data) {
           return $http({method:"GET", url: api.baseUrl+"return_wizards/delete_all.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.viewReturnWizard = function(id) {
           return $http({method:"GET", url: api.baseUrl+"return_wizards/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.editReturnWizard = function(data) {
           return $http({method:"GET", url: api.baseUrl+"return_wizards/edit_form.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.updateReturnWizard = function(id,data) {
           return $http({data: data, method:"PUT", url: api.baseUrl+"return_wizards/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.get_return_wizards = function() {
           return $http({method:"GET", url: api.baseUrl+"return_wizards/get_return_wizards.json"}).then(function(result){
               return result.data;
           });
        };

        return api;
    }

})();