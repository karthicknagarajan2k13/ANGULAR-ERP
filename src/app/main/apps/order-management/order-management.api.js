(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .factory('omApi', apiService);

    /** @ngInject */
    function apiService($resource,$q,$http)
    {
        var api = {};

        // Base Url
        api.baseUrl = 'http://localhost:8000/';

        api.getSalesOrders = function(data) {
           return $http({method:"GET", url: api.baseUrl+"sales_orders.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.deleteAllSalesOrder = function(data) {
           return $http({method:"GET", url: api.baseUrl+"sales_orders/delete_all.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.refreshSalesOrder = function() {
           return $http({method:"GET", url: api.baseUrl+"sales_orders/refresh.json"}).then(function(result){
               return result.data;
           });
        };
        api.viewSalesOrder = function(id) {
           return $http({method:"GET", url: api.baseUrl+"sales_orders/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.editSalesOrder = function(data) {
           return $http({method:"GET", url: api.baseUrl+"sales_orders/edit_form.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.updateSalesOrder = function(id,data) {
           return $http({data: data, method:"PUT", url: api.baseUrl+"sales_orders/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.getCustomers = function(data) {
           return $http({method:"GET", url: api.baseUrl+"customers/get_customers.json"}).then(function(result){
               return result.data;
           });
        };
        api.getContacts = function(data) {
           return $http({method:"GET", url: api.baseUrl+"contacts/get_contacts.json"}).then(function(result){
               return result.data;
           });
        };
        api.getSalesOrderInvoices = function(data) {
           return $http({method:"GET", url: api.baseUrl+"sales_order_invoices.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.deleteAllSalesOrderInvoice = function(data) {
           return $http({method:"GET", url: api.baseUrl+"sales_order_invoices/delete_all.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.viewSalesOrderInvoice = function(id) {
           return $http({method:"GET", url: api.baseUrl+"sales_order_invoices/"+id+".json"}).then(function(result){
               return result.data;
           });
        };

        return api;
    }

})();