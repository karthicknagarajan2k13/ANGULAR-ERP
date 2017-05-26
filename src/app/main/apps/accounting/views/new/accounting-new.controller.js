(function ()
{
    'use strict';

    angular
        .module('app.accounting')
        .controller('newAccountController', newAccountController);

    /** @ngInject */
    function newAccountController($mdToast,accApi, $scope, $document, $state)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;
        vm.account = {}
        vm.ssName = "s"
        var last = {
          bottom: false,
          top: true,
          left: false,
          right: true
        };
        function sanitizePosition() {
            var current = $scope.toastPosition;
            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;
            last = angular.extend({},current);
        }
        $scope.toastPosition = angular.extend({},last);
        $scope.getToastPosition = function() {
        sanitizePosition();
        return Object.keys($scope.toastPosition)
          .filter(function(pos) { return $scope.toastPosition[pos]; })
          .join(' ');
        };
        vm.saveAccount = function(){
            var dataPromise = accApi.createAccount({acc_account:vm.account});
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    var pinTo = $scope.getToastPosition();
                    $mdToast.show(
                      $mdToast.simple()
                        .textContent($scope.data.message)
                        .position(pinTo )
                        .hideDelay(3000)
                    );
                }else{
                    if( typeof($scope.data.acc_account_id) !== "undefined"){
                        $state.go('app.accounting.accounting-view', {obj:{id: $scope.data.acc_account_id}}); 
                    }
                }
            }); 
        }
        vm.accountDataClear = function(){
            vm.account = {}
        }
        vm.newAccountPage = function(){
            $state.go('app.accounting.accounting-new'); 
        }
        vm.AccountsPage = function(){
            $state.go('app.accounting.accounting'); 
        }
    }
})();