(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.register')
        .controller('RegisterController', RegisterController);

    /** @ngInject */
    function RegisterController(Auth, $scope, $window, $state)
    {
        $scope.user = {
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            password_confirmation: ''
        };
        var config = {
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
        };
        $scope.signup = function(){
            Auth.register($scope.user, config).then(function(registeredUser) {
                $state.go('app.pages_auth_login');
            }, function(error) {
                console.log('error',error)
            }); 
        }
        $scope.signinPage = function(){
            $state.go('app.pages_auth_login');
        }
    }
})();