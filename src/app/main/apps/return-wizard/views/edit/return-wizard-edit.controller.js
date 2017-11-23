(function ()
{
    'use strict';

    angular
        .module('app.return-wizard')
        .controller('editReturnWizardController', editReturnWizardController)
        .directive('allowDecimalNumbers', function () {  
                return {  
                    restrict: 'A',  
                    link: function (scope, elm, attrs, ctrl) {  
                        elm.on('keydown', function (event) {  
                            var $input = $(this);  
                            var value = $input.val();  
                            value = value.replace(/[^0-9\.]/g, '')  
                            var findsDot = new RegExp(/\./g)  
                            var containsDot = value.match(findsDot)  
                            if (containsDot != null && ([46, 110, 190].indexOf(event.which) > -1)) {  
                                event.preventDefault();  
                                return false;  
                            }  
                            $input.val(value);  
                            if (event.which == 64 || event.which == 16) {  
                                // numbers  
                                return false;  
                            } if ([8, 13, 27, 37, 38, 39, 40, 110].indexOf(event.which) > -1) {  
                                // backspace, enter, escape, arrows  
                                return true;  
                            } else if (event.which >= 48 && event.which <= 57) {  
                                // numbers  
                                return true;  
                            } else if (event.which >= 96 && event.which <= 105) {  
                                // numpad number  
                                return true;  
                            } else if ([46, 110, 190].indexOf(event.which) > -1) {  
                                // dot and numpad dot  
                                return true;  
                            } else {  
                                event.preventDefault();  
                                return false;  
                            }  
                        });  
                    }  
                }  
            });


    /** @ngInject */
    function editReturnWizardController($mdToast,omApi,crmApi,rwApi, $scope, $document, $state)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;
        vm.return_wizard = $state.params.obj
        vm.return_wizard.return_wizard.date_paid = new Date(vm.return_wizard.return_wizard.date_paid );

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

        vm.updateReturnWizard = function(){
           var dataPromise = rwApi.updateReturnWizard(vm.return_wizard.return_wizard.id,vm.return_wizard);
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
        vm.viewReturnWizardPage =function(id){
            $state.go('app.return-wizard.return-wizard-view', {obj:{id: id}}); 
        }
        vm.newReturnWizardPage = function(){
            $state.go('app.return-wizard.return-wizard-new'); 
        }
        vm.ReturnWizardsPage = function(){
            $state.go('app.return-wizard.return-wizard'); 
        }
        vm.calculateRefundedAmount = function(){
           vm.return_wizard.return_wizard.amount_to_be_refunded = vm.return_wizard.return_wizard.original_amount - vm.return_wizard.return_wizard.shipping_charges
        }
    }
})();