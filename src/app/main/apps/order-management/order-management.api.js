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
        api.baseUrl = 'https://ror-erp.herokuapp.com/';

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
        api.editSalesOrderInvoice = function(data) {
           return $http({method:"GET", url: api.baseUrl+"sales_order_invoices/edit_form.json",params: data}).then(function(result){
               return result.data;
           });
        };
        
        api.updateSalesOrder = function(id,data) {
           return $http({data: data, method:"PUT", url: api.baseUrl+"sales_orders/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.updateSalesOrderInvoice = function(id,data) {
           return $http({data: data, method:"PUT", url: api.baseUrl+"sales_order_invoices/"+id+".json"}).then(function(result){
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
        api.getAccounts = function() {
           return $http({method:"GET", url: api.baseUrl+"accounts/get_accounts.json"}).then(function(result){
               return result.data;
           });
        };
        api.desconnectAccounts = function(data) {
           return $http({method:"GET", url: api.baseUrl+"accounts/disconnect_account.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.connectAccounts = function(data) {
           return $http({method:"GET", url: api.baseUrl+"accounts/connect_account.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.connectAccount = function(data) {
           return $http({method:"POST", url: api.baseUrl+"/integration/4/connect",data: data}).then(function(result){
               return result.data;
           });
        };

        api.createSalesOrderInvoice = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"sales_order_invoices.json"}).then(function(result){
               return result.data;
           });
        };
        api.createInvoice = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"sales_order_invoices/create_invoice.json"}).then(function(result){
               return result.data;
           });
        };
        api.get_SalesOrders = function(data) {
           return $http({method:"GET", url: api.baseUrl+"sales_orders/get_sales_orders.json"}).then(function(result){
               return result.data;
           });
        };


        return api;
    }

})();