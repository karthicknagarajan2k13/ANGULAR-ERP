(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('OptionAccountController', OptionAccountController);

    /** @ngInject */
    function OptionAccountController(account_id, fuseTheming, mdDialog, $document, $window, omApi, $scope, $state)
    {

        var vm = this;
        console.log("account",account_id)

        var dataPromise = omApi.viewAccount(account_id);
        dataPromise.then(function(result) { 
            vm.account = result; 
        }); 

        vm.themes = fuseTheming.themes;

        vm.updateOptionAccount = function(){
           var dataPromise = omApi.updateAccount(vm.account.id,vm.account);
            dataPromise.then(function(result) { 
                $scope.data = result;
                console.log("$scope.data",$scope.data)
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.account_id) !== "undefined"){
                        mdDialog.hide();
                    }
                }
            }); 
        }
        vm.closeDialog = function(){
           mdDialog.hide();
        }

    }
})();