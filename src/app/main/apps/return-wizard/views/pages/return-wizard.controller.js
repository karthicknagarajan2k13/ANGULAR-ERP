(function ()
{
    'use strict';

    angular
        .module('app.return-wizard')
        .controller('ReturnWizardController', ReturnWizardController);

    /** @ngInject */
    function ReturnWizardController(rwApi,crmApi,omApi,$window, $scope, $state)
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
        vm.search_data.status1 = []
        vm.search_data.reason_for_return1 = []

        var dataPromise = rwApi.getReturnWizards({});
        dataPromise.then(function(result) { 
            $scope.return_wizards_data = result;
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

        var dataPromise = crmApi.get_customers({});
        dataPromise.then(function(result) { 
            $scope.get_customers = result;
        });
        var dataPromise = omApi.get_invoices({});
        dataPromise.then(function(result) { 
            $scope.get_invoices = result;
        });



        function initComplete(){
            $scope.show_table1 = true
        }


        vm.newReturnWizardPage = function(){
            $state.go('app.return-wizard.return-wizard-new'); 
        }
        vm.viewReturnWizardPage = function(id){
            $state.go('app.return-wizard.return-wizard-view', {obj:{id: id}}); 
        }
        vm.deleteAllReturnWizard = function () {
            var delete_ids = [];
            angular.forEach($scope.return_wizards_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = rwApi.deleteAllReturnWizard({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = rwApi.getReturnWizards({});
                    dataPromise.then(function(result) { 
                        $scope.return_wizards_data = result;
                    }); 
                });
            } 
        };
        vm.searchReturnWizardData = function(id){
            vm.search_data.status =  JSON.stringify(vm.search_data.status1)
            vm.search_data.reason_for_return =  JSON.stringify(vm.search_data.reason_for_return1)
            var dataPromise = rwApi.getReturnWizards(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.return_wizards_data = result; 
                vm.search_data.status = ''
                vm.search_data.reason_for_return = ''
            });
        }
        vm.searchReturnWizardDataClear = function(id){
            vm.search_data = {}
        }

        
    }
})();