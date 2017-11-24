(function () 
{
    'use strict';

    angular
        .module('app.asset-management')
        .controller('MaintananceController', MaintananceController)
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
    function MaintananceController($cookies,storageService,$timeout,$window, amApi, $scope, $state, kbApi)
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
        var vm = this;
        $scope.show_table1 = false
        $scope.show_table2 = false
        // Data
        vm.search_data = {}
        if( storageService.get('key') === null || storageService.get('key')  === "new"){
                var dataPromise = amApi.getMaintanances({});
                dataPromise.then(function(result) { 
                    $scope.maintanance_data = result;
                   
                }); 
        }else{
            storageService.save('key', "new");
            var data = $cookies.getObject('search');
            var dataPromise = amApi.getMaintanances(data);
            dataPromise.then(function(result) { 
                $scope.maintanance_data = result; 
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

         vm.refreshData = function(){
            storageService.save('key', "new");
            $cookies.putObject("search",'');
            $state.reload();
        }

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
           /* var dataPromise = amApi.getMaintanances(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.maintanance_data = result; 
            }); */
            $cookies.putObject("search",vm.search_data);
            storageService.save('key', "search");
            $state.reload();
        }
        vm.searchMaintananceDataClear = function(id){
            vm.search_data = {}
        }

		
    }
})();