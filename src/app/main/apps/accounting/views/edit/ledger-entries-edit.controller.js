(function ()
{
    'use strict';

    angular
        .module('app.accounting')
        .controller('editLedgerEntryController', editLedgerEntryController);

    /** @ngInject */
    function editLedgerEntryController($mdToast,omApi,crmApi,accApi, $scope, $document, $state)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;
        vm.ledger_entry = $state.params.obj

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
        var dataPromise = accApi.get_accounts({});
        dataPromise.then(function(result) { 
            $scope.get_accounts = result;
        });
        var dataPromise = omApi.get_invoices({});
        dataPromise.then(function(result) { 
            $scope.get_invoices = result;
        });

        vm.updateLedgerEntry = function(){
           var dataPromise = accApi.updateLedgerEntry(vm.ledger_entry.ledger_entry.id,vm.ledger_entry);
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
                    if( typeof($scope.data.ledger_entry_id) !== "undefined"){
                        $state.go('app.accounting.ledger-entries-view', {obj:{id: $scope.data.ledger_entry_id}}); 
                    }
                }
            }); 
        }
        vm.viewLedgerEntryPage =function(id){
            $state.go('app.accounting.ledger-entries-view', {obj:{id: id}}); 
        }
        vm.newLedgerEntryPage = function(){
            $state.go('app.accounting.ledger-entries-new'); 
        }
        vm.LedgerEntrysPage = function(){
            $state.go('app.accounting.ledger-entries'); 
        }
    }
})();