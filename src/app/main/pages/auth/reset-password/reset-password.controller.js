(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.reset-password')
        .controller('ResetPasswordController', ResetPasswordController);

    /** @ngInject */
    function ResetPasswordController($stateParams, $httpParamSerializer, Auth, $scope, $window, $state)
    {
        $scope.user = {
            password: '',
            password_confirmation: '',
            reset_password_token: $stateParams.token,
        };

        $scope.resetPassword = function(){
            Auth.resetPassword($scope.user).then(function(response) {
                $window.localStorage.setItem('current_user',JSON.stringify($scope.user));
                $state.go('app.crm.customers');
            }, function(error) {
                console.log('error',error)
            }); 
        }

        $scope.$on('devise:send-reset-password-instructions-successfully', function(event) {
            // ...
        });

    }
})();