(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.login')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($scope, Auth, $window, $state)
    {
        $scope.user = {
            email: '',
            password: '',
            remember_me: false
        };
        var config = {
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
        };
        $scope.login = function(){
            Auth.login($scope.user, config).then(function(user) {
                if(typeof(user.error) !== "undefined"){
                    console.log("error",user.error)
                }else{
                    $window.localStorage.setItem('current_user',JSON.stringify($scope.user));
                    $state.go('app.crm.customers');  
                }
            }, function(error) {
                console.log('error',error);
            });  
        }
        $scope.signupPage = function(){
            $state.go('app.pages_auth_register');
        }
        $scope.forgotPasswordPage = function(){
            $state.go('app.pages_auth_forgot-password');
        }
    };

})();