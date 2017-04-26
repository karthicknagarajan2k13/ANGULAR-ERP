(function ()
{        
    'use strict';   

    angular 

        .module('app.asset-management')
        .factory('amApi', apiService);

    /** @ngInject */
    function apiService($resource,$q,$http)
    {
        var api = {};

        // Base Url
        api.baseUrl = 'https://ror-erp.herokuapp.com/';
        // api.baseUrl = 'http://localhost:8000/';
 
        api.createAsset = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"assets.json"}).then(function(result){
               return result.data;
           });
        };
        api.getAssets = function(data) {
           return $http({method:"GET", url: api.baseUrl+"assets.json",params: data}).then(function(result){
               return result.data;
           });
        };

        api.deleteAllAsset = function(data) {
           return $http({method:"GET", url: api.baseUrl+"assets/delete_all.json",params: data}).then(function(result){
               return result.data;
           });
        };  
        api.viewAsset = function(id) {
           return $http({method:"GET", url: api.baseUrl+"assets/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.editAsset = function(data) {
           return $http({method:"GET", url: api.baseUrl+"assets/edit_form.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.updateAsset = function(id,data) {
           return $http({data: data, method:"PUT", url: api.baseUrl+"assets/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.get_assets = function() {
           return $http({method:"GET", url: api.baseUrl+"assets/get_assets.json"}).then(function(result){
               return result.data;
           });
        };



        api.getUsers = function() {
           return $http({method:"GET", url: api.baseUrl+"users/get_users.json"}).then(function(result){
               return result.data;
           });
        };
        api.get_employees = function() {
           return $http({method:"GET", url: api.baseUrl+"employees/get_employees.json"}).then(function(result){
               return result.data;
           });
        };

        api.createMaintanance = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"maintanance_schedules.json"}).then(function(result){
               return result.data;
           });
        };
         api.getMaintanances = function(data) {
           return $http({method: "GET", url: api.baseUrl+"maintanance_schedules.json",params: data}).then(function(result){
                return result.data;
            })
        }
        api.deleteAllMaintanance = function(data) {
           return $http({method:"GET", url: api.baseUrl+"maintanance_schedules/delete_all.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.viewMaintanance = function(id) {
           return $http({method:"GET", url: api.baseUrl+"maintanance_schedules/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.editMaintanance = function(data) {
           return $http({method:"GET", url: api.baseUrl+"maintanance_schedules/edit_form.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.updateMaintanance = function(id,data) {
           return $http({data: data, method:"PUT", url: api.baseUrl+"maintanance_schedules/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.get_maintanances = function() {
           return $http({method:"GET", url: api.baseUrl+"maintanance_schedules/get_maintanance_schedules.json"}).then(function(result){
               return result.data;
           });
        };
        return api;
    }

})();