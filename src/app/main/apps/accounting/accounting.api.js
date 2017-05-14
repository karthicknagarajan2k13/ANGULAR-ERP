(function ()
{
    'use strict';

    angular
        .module('app.accounting')
        .factory('accApi', apiService);

    /** @ngInject */
    function apiService($resource,$q,$http)
    {
        var api = {};

        // Base Url
        api.baseUrl = 'https://ror-erp.herokuapp.com/';

        api.createAccount = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"acc_accounts.json"}).then(function(result){
               return result.data;
           });
        };
        api.getAccounts = function(data) {
           return $http({method:"GET", url: api.baseUrl+"acc_accounts.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.deleteAllAccount = function(data) {
           return $http({method:"GET", url: api.baseUrl+"acc_accounts/delete_all.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.viewAccount = function(id) {
           return $http({method:"GET", url: api.baseUrl+"acc_accounts/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.editAccount = function(data) {
           return $http({method:"GET", url: api.baseUrl+"acc_accounts/edit_form.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.updateAccount = function(id,data) {
           return $http({data: data, method:"PUT", url: api.baseUrl+"acc_accounts/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.get_accounts = function() {
           return $http({method:"GET", url: api.baseUrl+"acc_accounts/get_acc_accounts.json"}).then(function(result){
               return result.data;
           });
        };
        api.getUsers = function() {
           return $http({method:"GET", url: api.baseUrl+"users/get_users.json"}).then(function(result){
               return result.data;
           });
        };

        
        api.createLedgerEntry = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"ledger_entries.json"}).then(function(result){
               return result.data;
           });
        };
        api.getLedgerEntries = function(data) {
           return $http({method:"GET", url: api.baseUrl+"ledger_entries.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.deleteAllLedgerEntry = function(data) {
           return $http({method:"GET", url: api.baseUrl+"ledger_entries/delete_all.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.viewLedgerEntry = function(id) {
           return $http({method:"GET", url: api.baseUrl+"ledger_entries/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.editLedgerEntry = function(data) {
           return $http({method:"GET", url: api.baseUrl+"ledger_entries/edit_form.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.updateLedgerEntry = function(id,data) {
           return $http({data: data, method:"PUT", url: api.baseUrl+"ledger_entries/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.get_ledger_entries = function() {
           return $http({method:"GET", url: api.baseUrl+"ledger_entries/get_ledger_entries.json"}).then(function(result){
               return result.data;
           });
        };

        
        api.createChequeRegister = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"cheque_registers.json"}).then(function(result){
               return result.data;
           });
        };
        api.getChequeRegisters = function(data) {
           return $http({method:"GET", url: api.baseUrl+"cheque_registers.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.deleteAllChequeRegister = function(data) {
           return $http({method:"GET", url: api.baseUrl+"cheque_registers/delete_all.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.viewChequeRegister = function(id) {
           return $http({method:"GET", url: api.baseUrl+"cheque_registers/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.editChequeRegister = function(data) {
           return $http({method:"GET", url: api.baseUrl+"cheque_registers/edit_form.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.updateChequeRegister = function(id,data) {
           return $http({data: data, method:"PUT", url: api.baseUrl+"cheque_registers/"+id+".json"}).then(function(result){
               return result.data;
           });
        };

        api.getCashFlowReports = function(data) {
           return $http({method:"GET", url: api.baseUrl+"cash_flow_reports.json",params: data}).then(function(result){
               return result.data;
           });
        };
        

        return api;
    }

})();