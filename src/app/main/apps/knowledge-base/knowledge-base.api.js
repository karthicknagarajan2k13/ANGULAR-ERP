(function ()
{
    'use strict';

    angular
        .module('app.knowledge-base')
        .factory('kbApi', apiService);

    /** @ngInject */
    function apiService($resource,$q,$http)
    {
        var api = {};

        // Base Url
        api.baseUrl = 'https://erp-rails-app.herokuapp.com/';

        api.createKbCategory = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"kb_categories.json"}).then(function(result){
               return result.data;
           });
        };
        api.getKbCategories = function(data) {
           return $http({method:"GET", url: api.baseUrl+"kb_categories.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.deleteAllKbCategory = function(data) {
           return $http({method:"GET", url: api.baseUrl+"kb_categories/delete_all.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.viewKbCategory = function(id) {
           return $http({method:"GET", url: api.baseUrl+"kb_categories/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.editKbCategory = function(data) {
           return $http({method:"GET", url: api.baseUrl+"kb_categories/edit_form.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.updateKbCategory = function(id,data) {
           return $http({data: data, method:"PUT", url: api.baseUrl+"kb_categories/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.get_kb_categories = function() {
           return $http({method:"GET", url: api.baseUrl+"kb_categories/get_kb_categories.json"}).then(function(result){
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

        api.createKnowledgeBase = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"knowledge_bases.json"}).then(function(result){
               return result.data;
           });
        };
        api.getKnowledgeBases = function(data) {
           return $http({method:"GET", url: api.baseUrl+"knowledge_bases.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.deleteAllKnowledgeBase = function(data) {
           return $http({method:"GET", url: api.baseUrl+"knowledge_bases/delete_all.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.viewKnowledgeBase = function(id) {
           return $http({method:"GET", url: api.baseUrl+"knowledge_bases/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.editKnowledgeBase = function(data) {
           return $http({method:"GET", url: api.baseUrl+"knowledge_bases/edit_form.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.updateKnowledgeBase = function(id,data) {
           return $http({data: data, method:"PUT", url: api.baseUrl+"knowledge_bases/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.get_knowledge_bases = function() {
           return $http({method:"GET", url: api.baseUrl+"knowledge_bases/get_knowledge_bases.json"}).then(function(result){
               return result.data;
           });
        };
        return api;
    }

})();