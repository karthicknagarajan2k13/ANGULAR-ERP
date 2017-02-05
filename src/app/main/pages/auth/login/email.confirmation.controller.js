(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.login')
        .controller('EmailConfirmationController', EmailConfirmationController);

    /** @ngInject */
    function EmailConfirmationController($stateParams, authApi, $scope, $state)
    {
        authApi.emailConfirmation($stateParams.confirmation_token).then(function(response) {
            if(typeof(response.error) !== "undefined"){
                console.log("error",response.error)
            }else{
                $state.go('app.pages_auth_login');
            }
        });
    };

})();