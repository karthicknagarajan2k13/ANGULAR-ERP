(function ()
{
    'use strict';

    angular
        .module('app.accounting')
        .controller('viewAccountController', viewAccountController);

    /** @ngInject */
    function viewAccountController(accApi, $scope, $document, $state)
    {
        var vm = this;
        $scope.isOpen = false;
        $scope.demo = {
            isOpen: false,
            count: 0,
            selectedDirection: 'left'
        };
        vm.dtInstance = {};
        vm.dtOptions = {
            bLengthChange  : false,
            paging: false,
            searching: false,
            bInfo: false,
        };
        
        vm.ssName = "s"

        $scope.account_data = {}

        //Api Call
        var dataPromise = accApi.viewAccount($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.account_data = result;
        }); 

        vm.editAccountPage = function(account){
             $state.go('app.accounting.accounting-edit', {obj:{acc_account: account}});
        }
        vm.deleteAccount = function(id){
            var delete_ids = JSON.stringify([id])
            accApi.deleteAllAccount({ids: delete_ids})
            $state.go('app.accounting.accounting'); 
        }
        vm.newAccountPage = function(){
            $state.go('app.accounting.accounting-new'); 
        }
        vm.AccountsPage = function(){
            $state.go('app.accounting.accounting'); 
        }
    }
})();