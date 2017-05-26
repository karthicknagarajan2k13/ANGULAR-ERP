(function ()
{
    'use strict';

    angular
        .module('app.return-wizard')
        .controller('newReturnWizardController', newReturnWizardController);

    /** @ngInject */
    function newReturnWizardController($mdToast,omApi,crmApi,rwApi, $scope, $document, $state)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;
        vm.return_wizard = {}
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
        var dataPromise = crmApi.get_customers({});
        dataPromise.then(function(result) { 
            $scope.get_customers = result;
        });
        var dataPromise = omApi.get_invoices({});
        dataPromise.then(function(result) { 
            $scope.get_invoices = result;
        });

        vm.saveReturnWizard = function(){
            var dataPromise = rwApi.createReturnWizard({return_wizard:vm.return_wizard});
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
                    if( typeof($scope.data.return_wizard_id) !== "undefined"){
                        $state.go('app.return-wizard.return-wizard-view', {obj:{id: $scope.data.return_wizard_id}}); 
                    }
                }
            }); 
        }
        vm.return_wizardDataClear = function(){
            vm.return_wizard = {}
        }
        vm.newReturnWizardPage = function(){
            $state.go('app.return-wizard.return-wizard-new'); 
        }
        vm.ReturnWizardsPage = function(){
            $state.go('app.return-wizard.return-wizard'); 
        }
        vm.calculateRefundedAmount = function(){
           vm.return_wizard.amount_to_be_refunded = vm.return_wizard.original_amount - vm.return_wizard.shipping_charges
        }
    }
})();