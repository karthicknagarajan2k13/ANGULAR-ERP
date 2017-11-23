(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.forgot-password')
        .controller('ForgotPasswordController', ForgotPasswordController);

    /** @ngInject */
    function ForgotPasswordController(Auth, $scope, $window, $state)
    {
        $scope.user = {
            email: '',
        };

        $scope.forgotPassword = function(){
            Auth.sendResetPasswordInstructions($scope.user).then(function(response) {
                console.log("response",response)
                $state.go('app.pages_auth_login');
            }, function(error) {
                console.log('error',error)
            }); 
        }

        $scope.$on('devise:send-reset-password-instructions-successfully', function(event) {
            // ...
        });

        $scope.signinPage = function(){
            $state.go('app.pages_auth_login');
        }
        $scope.signupPage = function(){
            $state.go('app.pages_auth_register');
        }
    }
})();