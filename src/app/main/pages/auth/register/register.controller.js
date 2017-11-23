(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.register')
        .controller('RegisterController', RegisterController)
        .directive('confirmPwd', function($interpolate, $parse) {
          return {
            require: 'ngModel',
            link: function(scope, elem, attr, ngModelCtrl) {

              var pwdToMatch = $parse(attr.confirmPwd);
              var pwdFn = $interpolate(attr.confirmPwd)(scope);

              scope.$watch(pwdFn, function(newVal) {
                  ngModelCtrl.$setValidity('password', ngModelCtrl.$viewValue == newVal);
              })

              ngModelCtrl.$validators.password = function(modelValue, viewValue) {
                var value = modelValue || viewValue;
                return value == pwdToMatch(scope);
              };

            }
          }
        });

    /** @ngInject */
    function RegisterController(Auth, $scope, $window, $state,$mdToast)
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
               /* var pinTo = $scope.getToastPosition();*/
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Registration Successful')
                   /* .position(pinTo )*/
                    .hideDelay(3000)
                );
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