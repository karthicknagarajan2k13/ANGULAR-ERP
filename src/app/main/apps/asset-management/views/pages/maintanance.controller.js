(function () 
{
    'use strict';

    angular
        .module('app.asset-management')
        .controller('MaintananceController', MaintananceController);

    /** @ngInject */
    function MaintananceController($window, amApi, $scope, $state, kbApi)
    {
       console.log("hi");

        $scope.isOpen = false;
        $scope.demo = {
            isOpen: false,
            count: 0,
            selectedDirection: 'left'
        };
        var vm = this;
        $scope.show_table1 = false
        $scope.show_table2 = false
        // Data
        vm.search_data = {}
        var dataPromise = amApi.getMaintanances({});
        dataPromise.then(function(result) { 
            $scope.maintanance_data = result;
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

        var dataPromise = amApi.get_assets({});
        dataPromise.then(function(result) { 
            console.log("result",result)
            $scope.get_assets = result;
        });

        var dataPromise = kbApi.getUsers({});
        dataPromise.then(function(result) { 
            $scope.get_users = result;
        }); 

        var dataPromise = kbApi.get_kb_categories({});
        dataPromise.then(function(result) { 
            $scope.get_kb_categories = result;
        });



        function initComplete(){
            $scope.show_table1 = true
        }
        
        vm.newMaintanancePage = function(){
            $state.go('app.asset-management.maintanance-new'); 
        }
        vm.viewMaintanancePage = function(id){
            $state.go('app.asset-management.maintanance-view', {obj:{id: id}}); 
        }
        vm.deleteAllMaintanance = function () {
            var delete_ids = [];
            angular.forEach($scope.maintanance_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = amApi.deleteAllMaintanance({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = amApi.getMaintanances({});
                    dataPromise.then(function(result) { 
                        $scope.maintanance_data = result;
                    }); 
                });
                 $state.go('app.asset-management.maintanance'); 
            }
        };
        vm.searchMaintananceData = function(id){
            var dataPromise = amApi.getMaintanances(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.maintanance_data = result; 
            }); 
        }
        vm.searchMaintananceDataClear = function(id){
            vm.search_data = {}
        }

		
    }
})();