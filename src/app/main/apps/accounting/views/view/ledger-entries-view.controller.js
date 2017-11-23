(function ()
{
    'use strict';

    angular
        .module('app.accounting')
        .controller('viewLedgerEntryController', viewLedgerEntryController);

    /** @ngInject */
    function viewLedgerEntryController(accApi, $scope, $document, $state)
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

        $scope.ledger_entry_data = {}

        //Api Call
        var dataPromise = accApi.viewLedgerEntry($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.ledger_entry_data = result;
        }); 

        vm.editLedgerEntryPage = function(ledger_entry){
             $state.go('app.accounting.ledger-entries-edit', {obj:{ledger_entry: ledger_entry}});
        }
        vm.deleteLedgerEntry = function(id){
            var delete_ids = JSON.stringify([id])
            accApi.deleteAllLedgerEntry({ids: delete_ids})
            $state.go('app.accounting.ledger-entries'); 
        }
        vm.newLedgerEntryPage = function(){
            $state.go('app.accounting.ledger-entries-new'); 
        }
        vm.LedgerEntrysPage = function(){
            $state.go('app.accounting.ledger-entries'); 
        }
    }
})();