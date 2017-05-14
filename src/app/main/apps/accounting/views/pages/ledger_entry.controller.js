(function ()
{
    'use strict';

    angular
        .module('app.accounting')
        .controller('LedgerEntryController', LedgerEntryController);

    /** @ngInject */
    function LedgerEntryController(crmApi,omApi,$window, accApi, $scope, $state)
    {
        $scope.isOpen = false;
        $scope.demo = {
            isOpen: false,
            count: 0,
            selectedDirection: 'left'
        };
        
        var vm = this;

        // Data
        vm.search_data = {}
        var dataPromise = accApi.getLedgerEntries({});
        dataPromise.then(function(result) { 
            $scope.ledger_entries_data = result;
            console.log("$scope.ledger_entries_data",$scope.ledger_entries_data)
        }); 

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

        vm.dtInstance = {};
        vm.dtOptions = {
            dom         : 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            columnDefs  : [
                {
                    // Target the id column
                    targets: 0,
                    width  : '10px'
                }
            ],
            initComplete: function ()
            {
                var api = this.api(),
                    searchBox = angular.element('body').find('#e-commerce-products-search');

                // Bind an external input as a table wide search box
                if ( searchBox.length > 0 )
                {
                    searchBox.on('keyup', function (event)
                    {
                        api.search(event.target.value).draw();
                    });
                }
            },
            pagingType  : 'simple',
            lengthMenu  : [10, 20, 30, 50, 100],
            pageLength  : 20,
            scrollY     : 'auto',
            responsive  : true
        };


        vm.newLedgerEntryPage = function(){
            $state.go('app.accounting.ledger-entries-new'); 
        }
        vm.viewLedgerEntryPage = function(id){
            $state.go('app.accounting.ledger-entries-view', {obj:{id: id}}); 
        }
        vm.deleteAllLedgerEntry = function () {
            var delete_ids = [];
            angular.forEach($scope.ledger_entries_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = accApi.deleteAllLedgerEntry({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = accApi.getLedgerEntries({});
                    dataPromise.then(function(result) { 
                        $scope.ledger_entries_data = result;
                    }); 
                });
            } 
        };
        vm.searchLedgerEntryData = function(id){
            var dataPromise = accApi.getLedgerEntries(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.ledger_entries_data = result; 
            }); 
        }
        vm.searchLedgerEntryDataClear = function(id){
            vm.search_data = {}
        }

		
    }
})();