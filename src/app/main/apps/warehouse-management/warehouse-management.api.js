(function ()
{
    'use strict';

    angular
        .module('app.warehouse-management')
        .factory('whApi', apiService);

    /** @ngInject */
    function apiService($resource,$q,$http)
    {
        var api = {};

        // Base Url
        api.baseUrl = 'https://ror-erp.herokuapp.com/';

        api.createWarehouse = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"warehouses.json"}).then(function(result){
               return result.data;
           });
        };
        api.getWarehouses = function(data) {
           return $http({method:"GET", url: api.baseUrl+"warehouses.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.deleteAllWarehouse = function(data) {
           return $http({method:"GET", url: api.baseUrl+"warehouses/delete_all.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.viewWarehouse = function(id) {
           return $http({method:"GET", url: api.baseUrl+"warehouses/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.editWarehouse = function(data) {
           return $http({method:"GET", url: api.baseUrl+"warehouses/edit_form.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.updateWarehouse = function(id,data) {
           return $http({data: data, method:"PUT", url: api.baseUrl+"warehouses/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.get_warehouses = function() {
           return $http({method:"GET", url: api.baseUrl+"warehouses/get_warehouses.json"}).then(function(result){
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

        api.createWarehouseLocation = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"warehouse_locations.json"}).then(function(result){
               return result.data;
           });
        };
        api.addItemWarehouseLocation = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"warehouse_locations/add_item.json"}).then(function(result){
               return result.data;
           });
        };
        api.getWarehouseLocations = function(data) {
           return $http({method:"GET", url: api.baseUrl+"warehouse_locations.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.deleteAllWarehouseLocation = function(data) {
           return $http({method:"GET", url: api.baseUrl+"warehouse_locations/delete_all.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.viewWarehouseLocation = function(id) {
           return $http({method:"GET", url: api.baseUrl+"warehouse_locations/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.editWarehouseLocation = function(data) {
           return $http({method:"GET", url: api.baseUrl+"warehouse_locations/edit_form.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.updateWarehouseLocation = function(id,data) {
           return $http({data: data, method:"PUT", url: api.baseUrl+"warehouse_locations/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.get_warehouse_locations = function() {
           return $http({method:"GET", url: api.baseUrl+"warehouse_locations/get_warehouse_locations.json"}).then(function(result){
               return result.data;
           });
        };
        return api;
    }

})();