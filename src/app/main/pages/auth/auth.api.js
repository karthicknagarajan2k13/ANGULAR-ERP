(function ()
{
    'use strict';

    angular
        .module('app.pages')
        .factory('authApi', apiService);

    /** @ngInject */
    function apiService($resource,$q,$http)
    {
        var api = {};

        // Base Url
        api.baseUrl = 'https://erp-rails-app.herokuapp.com/';

        api.emailConfirmation = function(confirmation_token) {
           return $http({method:"GET", url: api.baseUrl+"users/email_confirmation.json?confirmation_token="+confirmation_token}).then(function(result){
               return result.data;
           });
        };
        return api;
    }

})();