(function ()
{
    'use strict';

    angular
        .module('app.warehouse-management')
        .controller('WareHouseController', WareHouseController)
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
    function WareHouseController($cookies,storageService,$timeout,$window, whApi, $scope, $state)
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
            var dataPromise = whApi.getWarehouses({});
            dataPromise.then(function(result) { 
                $scope.warehouses_data = result;
            }); 
        }else{
            storageService.save('key', "new");
            var data = $cookies.getObject('search');
            var dataPromise = whApi.getWarehouses(data);
            dataPromise.then(function(result) { 
                $scope.warehouses_data = result; 
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


        var dataPromise = whApi.getUsers({});
        dataPromise.then(function(result) { 
            $scope.get_users = result;
        }); 




        function initComplete(){
            $scope.show_table1 = true
        }

         vm.refreshData = function(){
            storageService.save('key', "new");
            $cookies.putObject("search",'');
            $state.reload();
        }
        
        
        vm.newWarehousePage = function(){
            $state.go('app.warehouse-management.warehouse-new'); 
        }
        vm.viewWarehousePage = function(id){
            $state.go('app.warehouse-management.warehouse-view', {obj:{id: id}}); 
        }
        vm.deleteAllWarehouse = function () {
            var delete_ids = [];
            angular.forEach($scope.warehouses_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = whApi.deleteAllWarehouse({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = whApi.getWarehouses({});
                    dataPromise.then(function(result) { 
                        $scope.warehouses_data = result;
                    }); 
                });
            }
        };
        vm.searchWarehouseData = function(id){
          /*var dataPromise = whApi.getWarehouses(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.warehouses_data = result; 
            }); */
            $cookies.putObject("search",vm.search_data);
            storageService.save('key', "search");
            $state.reload();
        }
        vm.searchWarehouseDataClear = function(id){
            vm.search_data = {}
        }

		
    }
})();