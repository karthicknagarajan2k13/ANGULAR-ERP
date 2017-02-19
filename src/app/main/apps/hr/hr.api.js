(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .factory('hrApi', apiService);

    /** @ngInject */
    function apiService($resource,$q,$http)
    {
        var api = {};

        // Base Url
        api.baseUrl = 'https://ror-erp.herokuapp.com/';

        api.createEmployee = function(data) {
           var fd = new FormData();
           fd.append('file', data.employee.employee_attributes.photo);
           fd.append('employee', angular.toJson(data));
           return $http({headers: {'Content-Type': undefined}, transformRequest: angular.identity,data: fd, method:"POST", url: api.baseUrl+"employees.json"}).then(function(result){
               return result.data;
           });
        };
        api.getEmployees = function(data) {
           return $http({method:"GET", url: api.baseUrl+"employees.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.deleteAllEmployee = function(data) {
           return $http({method:"GET", url: api.baseUrl+"employees/delete_all.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.viewEmployee = function(id) {
           return $http({method:"GET", url: api.baseUrl+"employees/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.editEmployee = function(data) {
           return $http({method:"GET", url: api.baseUrl+"employees/edit_form.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.updateEmployee = function(id,data) {
           var fd = new FormData();
           fd.append('file', data.employee_attributes.photo);
           fd.append('employee', angular.toJson(data));
           return $http({transformRequest: angular.identity, headers: {'Content-Type': undefined},data: fd, method:"PUT", url: api.baseUrl+"employees/"+id+".json"}).then(function(result){
               return result.data;
           });
        };

        api.createPayroll = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"payrolls.json"}).then(function(result){
               return result.data;
           });
        };
        api.getPayrolls = function(data) {
           return $http({method:"GET", url: api.baseUrl+"payrolls.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.deleteAllPayroll = function(data) {
           return $http({method:"GET", url: api.baseUrl+"payrolls/delete_all.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.viewPayroll = function(id) {
           return $http({method:"GET", url: api.baseUrl+"payrolls/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.editPayroll = function(data) {
           return $http({method:"GET", url: api.baseUrl+"payrolls/edit_form.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.updatePayroll = function(id,data) {
           return $http({data: data, method:"PUT", url: api.baseUrl+"payrolls/"+id+".json"}).then(function(result){
               return result.data;
           });
        };


        api.createExpense = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"expenses.json"}).then(function(result){
               return result.data;
           });
        };
        api.getExpenses = function(data) {
           return $http({method:"GET", url: api.baseUrl+"expenses.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.deleteAllExpense = function(data) {
           return $http({method:"GET", url: api.baseUrl+"expenses/delete_all.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.viewExpense = function(id) {
           return $http({method:"GET", url: api.baseUrl+"expenses/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.editExpense = function(data) {
           return $http({method:"GET", url: api.baseUrl+"expenses/edit_form.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.updateExpense = function(id,data) {
           return $http({data: data, method:"PUT", url: api.baseUrl+"expenses/"+id+".json"}).then(function(result){
               return result.data;
           });
        };


        api.createTimeclock = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"timeclocks.json"}).then(function(result){
               return result.data;
           });
        };
        api.getTimeclocks = function(data) {
           return $http({method:"GET", url: api.baseUrl+"timeclocks.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.deleteAllTimeclock = function(data) {
           return $http({method:"GET", url: api.baseUrl+"timeclocks/delete_all.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.viewTimeclock = function(id) {
           return $http({method:"GET", url: api.baseUrl+"timeclocks/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.editTimeclock = function(data) {
           return $http({method:"GET", url: api.baseUrl+"timeclocks/edit_form.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.updateTimeclock = function(id,data) {
           return $http({data: data, method:"PUT", url: api.baseUrl+"timeclocks/"+id+".json"}).then(function(result){
               return result.data;
           });
        };


        api.getReportPayrolls = function(data) {
           return $http({method:"GET", url: api.baseUrl+"report_payrolls.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.getReportExpenses = function(data) {
           return $http({method:"GET", url: api.baseUrl+"report_expenses.json",params: data}).then(function(result){
               return result.data;
           });
        };

        api.getUsers = function() {
           return $http({method:"GET", url: api.baseUrl+"users/get_users.json"}).then(function(result){
               return result.data;
           });
        };

        api.uploadEmployeePhoto = function(employee,file) {
           var fd = new FormData();
           fd.append('file', file);
           fd.append('employee', angular.toJson(employee));
           return $http({headers: {'Content-Type': undefined}, transformRequest: angular.identity,data: fd, method:"POST", url: api.baseUrl+"employees/upload_photo.json"}).then(function(result){
               return result.data;
           });
        };

        // api.get_categories = function() {
        //    return $http({method:"GET", url: api.baseUrl+"categories/get_categories.json"}).then(function(result){
        //        return result.data;
        //    });
        // };

        api.get_employees = function() {
           return $http({method:"GET", url: api.baseUrl+"employees/get_employees.json"}).then(function(result){
               return result.data;
           });
        };
        return api;
    }

})();