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
        api.baseUrl = 'https://erp-rails-app.herokuapp.com/';

        api.getSalesOrders = function(data) {
           return $http({method:"GET", url: api.baseUrl+"sales_orders.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.deleteAllSalesOrder = function(data) {
          console.log("---->"+JSON.stringify(data));
          return $http({method:"POST", url: api.baseUrl+"sales_orders/sales_order_delete",params: data}).then(function(result){
               return result.data;
           });
         /*  return $http({method:"GET", url: api.baseUrl+"sales_orders/delete_all.json",params: data}).then(function(result){
               return result.data;
           });*/
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
        api.refreshSalesOrder = function() {
           return $http({method:"GET", url: api.baseUrl+"sales_orders/refresh.json"}).then(function(result){
               return result.data;
           });
        };
        api.viewSalesOrder = function(data) {
           /*return $http({method:"GET", url: api.baseUrl+"sales_orders/"+id+".json"}).then(function(result){
               return result.data;
           });*/
           return $http({data: data, method:"POST", url: api.baseUrl+"sales_orders/view_sales_orders"}).then(function(result){
               return result.data;
           });
        };
        api.editSalesOrder = function(data) {
         /*  return $http({method:"GET", url: api.baseUrl+"sales_orders/edit_form.json",params: data}).then(function(result){
               return result.data;
           });*/
           console.log("----"+JSON.stringify(data));
           return $http({method:"POST", url: api.baseUrl+"sales_orders/edit_sales_orders",params: data}).then(function(result){
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
        api.getMarketplaces = function() {
           return $http({method:"GET", url: api.baseUrl+"accounts/get_marketplaces.json"}).then(function(result){
               return result.data;
           });
        };
        api.createMarketplace = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"accounts.json"}).then(function(result){
               return result.data;
           });
        };

        api.desconnectAccounts = function(data) {
           return $http({method:"POST", url: api.baseUrl+"accounts/disconnect_account.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.connectAccounts = function(data) {
           return $http({method:"GET", url: api.baseUrl+"accounts/connect_account.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.connectAccount = function(data) {
           return $http({method:"POST", url: api.baseUrl+"integration/4/connect",data: data}).then(function(result){
               return result.data;
           });
        };

        api.updateAccount = function(id,data) {
           return $http({data: data, method:"PUT", url: api.baseUrl+"accounts/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.viewAccount = function(id) {
           return $http({method:"GET", url: api.baseUrl+"accounts/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        

        api.createSalesOrderInvoice = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"sales_order_invoices.json"}).then(function(result){
               return result.data;
           });
        };
        api.createSalesOrder = function(data) {
          console.log(JSON.stringify(data));
           return $http({data: data, method:"POST", url: api.baseUrl+"sales_orders/create_sales_order"}).then(function(result){
               return result.data;
           });
        };

        api.createInvoice = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"sales_order_invoices/create_invoice.json"}).then(function(result){
               return result.data;
           });
        };
        api.get_SalesOrders = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"sales_orders/get_sales_orders"}).then(function(result){
               return result.data;
           });
        };
        api.get_invoices = function(data) {
           return $http({method:"GET", url: api.baseUrl+"sales_order_invoices/get_sales_order_invoices.json"}).then(function(result){
               return result.data;
           });
        };
        api.get_categories = function() {
           return $http({method:"GET", url: api.baseUrl+"categories/get_categories.json"}).then(function(result){
               return result.data;
           });
        };
        api.getSearchSalesOrders = function(data) {
          console.log(JSON.stringify(data))
           return $http({data: data, method:"POST", url: api.baseUrl+"sales_orders/search_sales_orders"}).then(function(result){
               return result.data;
           });
        };
        
        return api;
    }

})();