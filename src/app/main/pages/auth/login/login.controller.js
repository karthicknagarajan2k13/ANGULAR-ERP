(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.login')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($scope, $mdToast, Auth, $window, $state)
    {
		
		//Toast Control Start
		var last = {
		  bottom: false,
		  top: true,
		  left: false,
		  right: true
		};
		
		$scope.toastPosition = angular.extend({},last);
		$scope.getToastPosition = function() {
		sanitizePosition();
		return Object.keys($scope.toastPosition)
		  .filter(function(pos) { return $scope.toastPosition[pos]; })
		  .join(' ');
	  };

		function sanitizePosition() {
			var current = $scope.toastPosition;

			if ( current.bottom && last.top ) current.top = false;
			if ( current.top && last.bottom ) current.bottom = false;
			if ( current.right && last.left ) current.left = false;
			if ( current.left && last.right ) current.right = false;

			last = angular.extend({},current);
		  }

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
            $scope.isLoading = true;
            Auth.login($scope.user, config).then(function(user) {
                $scope.isLoading = false;
                $window.localStorage.setItem('userInfo',JSON.stringify(user));
                if(typeof(user.error) !== "undefined"){
                    var pinTo = $scope.getToastPosition();
                    $mdToast.show(
                      $mdToast.simple()
                        .textContent(user.error)
                        .position(pinTo )
                        .hideDelay(3000)
                    );
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