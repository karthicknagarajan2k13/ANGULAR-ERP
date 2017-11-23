(function ()
{
    'use strict';

    angular
        .module('app.pages', [
            'app.pages.auth.login',
            'app.pages.auth.register',
            'app.pages.auth.forgot-password',
            'app.pages.auth.reset-password'
        ])
        .config(config)
        .directive('emailNotUsed', function($http, $q) {
          return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
              ngModel.$asyncValidators.emailNotUsed = function(modelValue, viewValue) {
                return $http.get('https://erp-rails-app.herokuapp.com/users/check_email.json?email='+modelValue).then(function(response) {
                  console.log("resonse",response.data.data)
                  return response.data.data == true ? $q.reject('Email is already used.') : true;
                });
              };
            }
          };
        });

        /** @ngInject */
        function config(msNavigationServiceProvider)
        {
        }
})();