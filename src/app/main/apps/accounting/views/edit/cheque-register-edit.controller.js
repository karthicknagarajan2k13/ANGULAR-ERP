(function ()
{
    'use strict';

    angular
        .module('app.accounting')
        .controller('editChequeRegisterController', editChequeRegisterController);

    /** @ngInject */
    function editChequeRegisterController($mdToast,crmApi, accApi, $scope, $document, $state)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;
        vm.cheque_register = $state.params.obj

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

        vm.updateChequeRegister = function(){
           var dataPromise = accApi.updateChequeRegister(vm.cheque_register.cheque_register.id,vm.cheque_register);
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
                    if( typeof($scope.data.cheque_register_id) !== "undefined"){
                        $state.go('app.accounting.cheque-register-view', {obj:{id: $scope.data.cheque_register_id}}); 
                    }
                }
            }); 
        }
        vm.viewChequeRegisterPage =function(id){
            $state.go('app.accounting.cheque-register-view', {obj:{id: id}}); 
        }
        vm.newChequeRegisterPage = function(){
            $state.go('app.accounting.cheque-register-new'); 
        }
        vm.ChequeRegistersPage = function(){
            $state.go('app.accounting.cheque-register'); 
        }
    }
})();