(function ()
{
    'use strict';

    angular
        .module('app.manufacturing')
        .factory('mfgApi', apiService);

    /** @ngInject */
    function apiService($resource,$q,$http)
    {
        var api = {};

        // Base Url
        api.baseUrl = 'https://erp-rails.herokuapp.com/';

        api.createManufacturing = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"manufacturings.json"}).then(function(result){
               return result.data;
           });
        };
        api.getManufacturings = function(data) {
           return $http({method:"GET", url: api.baseUrl+"manufacturings.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.deleteAllManufacturing = function(data) {
           return $http({method:"GET", url: api.baseUrl+"manufacturings/delete_all.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.viewManufacturing = function(id) {
           return $http({method:"GET", url: api.baseUrl+"manufacturings/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.editManufacturing = function(data) {
           return $http({method:"GET", url: api.baseUrl+"manufacturings/edit_form.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.updateManufacturing = function(id,data) {
           return $http({data: data, method:"PUT", url: api.baseUrl+"manufacturings/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.get_manufacturings = function() {
           return $http({method:"GET", url: api.baseUrl+"manufacturings/get_manufacturings.json"}).then(function(result){
               return result.data;
           });
        };



        api.getUsers = function() {
           return $http({method:"GET", url: api.baseUrl+"users/get_users.json"}).then(function(result){
               return result.data;
           });
        };
        api.get_items = function() {
           return $http({method:"GET", url: api.baseUrl+"items/get_items.json"}).then(function(result){
               return result.data;
           });
        };
        api.get_SalesOrders = function(data) {
           return $http({method:"GET", url: api.baseUrl+"sales_orders/get_sales_orders.json"}).then(function(result){
               return result.data;
           });
        };
        api.addManufacturingMaterial = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"manufacturings/add_material.json"}).then(function(result){
               return result.data;
           });
        };
        

        api.createMaterial = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"materials.json"}).then(function(result){
               return result.data;
           });
        };
        api.getMaterials = function(data) {
           return $http({method:"GET", url: api.baseUrl+"materials.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.deleteAllMaterial = function(data) {
           return $http({method:"GET", url: api.baseUrl+"materials/delete_all.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.viewMaterial = function(id) {
           return $http({method:"GET", url: api.baseUrl+"materials/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.editMaterial = function(data) {
           return $http({method:"GET", url: api.baseUrl+"materials/edit_form.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.updateMaterial = function(id,data) {
           return $http({data: data, method:"PUT", url: api.baseUrl+"materials/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.get_materials = function() {
           return $http({method:"GET", url: api.baseUrl+"materials/get_materials.json"}).then(function(result){
               return result.data;
           });
        };
        return api;
    }

})();