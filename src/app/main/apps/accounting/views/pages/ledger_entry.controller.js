(function ()
{
    'use strict';

    angular
        .module('app.accounting')
        .controller('LedgerEntryController', LedgerEntryController)
         .factory('storageService', ['$rootScope', function($rootScope) {
                return {
                    get: function(key) {
                        return sessionStorage.getItem(key);
                    },
                    save: function(key, data) {
                        sessionStorage.setItem(key, data);
                    },
                    getModel: function(key) {
                        return sessionStorage.getItem(key);
                    },
                    setModel: function(key, data) {
                        sessionStorage.setItem(key, data);
                    }
            };
        }]);

    /** @ngInject */
    function LedgerEntryController($cookies,storageService, $timeout,crmApi,omApi,$window, accApi, $scope, $state)
    {
        if(storageService.get('key')=== undefined){
             storageService.save('key', "new");
        }


        $scope.isOpen = false;
        $scope.demo = {
            isOpen: false,
            count: 0,
            selectedDirection: 'left'
        };
        $scope.show_table1 = false
        $scope.show_table2 = false
        var vm = this;

        // Data
        vm.search_data = {}
        if( storageService.get('key') === null || storageService.get('key')  === "new"){
                var dataPromise = accApi.getLedgerEntries({});
                dataPromise.then(function(result) { 
                    $scope.ledger_entries_data = result;

                }); 
        }else{
            storageService.save('key', "new");
            var data = $cookies.getObject('search');
            var dataPromise = accApi.getLedgerEntries(data);
            dataPromise.then(function(result) { 
                $scope.ledger_entries_data = result; 
                vm.search_data  = data;
            }); 
        }

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
                initComplete: initComplete,
                pagingType  : 'simple',
                lengthMenu  : [10, 20, 30, 50, 100],
                pageLength  : 20,
                scrollY     : 'auto',
                responsive  : true
            };
            $timeout(function(){
                $scope.show_table2 = true
            }, 2000);

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


        vm.refreshData = function(){
            storageService.save('key', "new");
            $cookies.putObject("search",'');
            $state.reload();
        }


        function initComplete(){
            $scope.show_table1 = true
        }
        
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
           /* var dataPromise = accApi.getLedgerEntries(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.ledger_entries_data = result; 
            }); */
            $cookies.putObject("search",vm.search_data);
            storageService.save('key', "search");
            /*vm.search_data.c_type = ''*/
            $state.reload();
        }
        vm.searchLedgerEntryDataClear = function(id){
            vm.search_data = {}
        }

		
    }
})();