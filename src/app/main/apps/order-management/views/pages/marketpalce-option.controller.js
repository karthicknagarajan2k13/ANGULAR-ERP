(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('OptionAccountController', OptionAccountController);

    /** @ngInject */
    function OptionAccountController($mdToast,account_id, fuseTheming, mdDialog, $document, $window, omApi, $scope, $state)
    {

        var vm = this;

        var dataPromise = omApi.viewAccount(account_id);
        dataPromise.then(function(result) { 
            vm.account = result; 
        }); 
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
        vm.themes = fuseTheming.themes;

        vm.updateOptionAccount = function(){
           var dataPromise = omApi.updateAccount(vm.account.id,vm.account);
            dataPromise.then(function(result) { 
                $scope.data = result;
                console.log("$scope.data",$scope.data)
                if( typeof($scope.data.message) !== "undefined"){
                    var pinTo = $scope.getToastPosition();
                    $mdToast.show(
                      $mdToast.simple()
                        .textContent($scope.data.message)
                        .position(pinTo )
                        .hideDelay(3000)
                    );
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