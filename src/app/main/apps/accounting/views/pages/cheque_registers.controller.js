(function ()
{
    'use strict';

    angular
        .module('app.accounting')
        .controller('ChequeRegisterController', ChequeRegisterController);

    /** @ngInject */
    function ChequeRegisterController($window, accApi, $scope, $state)
    {
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
        vm.search_data.rate_type1 = []

        var dataPromise = accApi.getChequeRegisters({});
        dataPromise.then(function(result) { 
            $scope.cheque_registers_data = result;
            $scope.show_table2 = true

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
        }); 



        function initComplete(){
            $scope.show_table1 = true
        }
        
        vm.newChequeRegisterPage = function(){
            $state.go('app.accounting.cheque-register-new'); 
        }
        vm.viewChequeRegisterPage = function(id){
            $state.go('app.accounting.cheque-register-view', {obj:{id: id}}); 
        }
        vm.deleteAllChequeRegister = function () {
            var delete_ids = [];
            angular.forEach($scope.cheque_registers_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = accApi.deleteAllChequeRegister({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = accApi.getChequeRegisters({});
                    dataPromise.then(function(result) { 
                        $scope.cheque_registers_data = result;
                    }); 
                });
            } 
        };
        vm.searchChequeRegisterData = function(id){
            vm.search_data.rate_type =  JSON.stringify(vm.search_data.rate_type1)
            var dataPromise = accApi.getChequeRegisters(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.cheque_registers_data = result;
                vm.search_data.rate_type = ""
            }); 
        }
        vm.searchChequeRegisterDataClear = function(id){
            vm.search_data = {}
        }		
    }
})();