(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('itemController', itemController)
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
    function itemController($cookies,storageService,$timeout,$window, imApi, $scope, $state)
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
                var dataPromise = imApi.getItems({});
                dataPromise.then(function(result) { 
                    $scope.items_data = result;
                });
        }else{
             storageService.save('key', "new");
             var data = $cookies.getObject('search');
                var dataPromise = imApi.getItems(data);
                dataPromise.then(function(result) { 
                    $scope.items_data = result; 
                    vm.search_data  = data;
                }); 
        }

         vm.refreshData = function(){
            storageService.save('key', "new");
            $cookies.putObject("search",'');
            $state.reload();
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
        var dataPromise = imApi.get_suppliers({});
        dataPromise.then(function(result) { 
            $scope.get_suppliers = result;
        });  
        var dataPromise = imApi.get_categories({});
        dataPromise.then(function(result) { 
            $scope.get_categories = result;
        }); 


        function initComplete(){
            $scope.show_table1 = true
        }
        
        vm.newItemPage = function(){
            $state.go('app.inventory-management.items-new'); 
        }
        vm.editItemPage = function(category){
             $state.go('app.inventory-management.items-edit', {obj:{item: category}});
        }
        vm.viewItemPage = function(id){
            $state.go('app.inventory-management.items-view', {obj:{id: id}}); 
        }
        vm.deleteAllItem = function () {
            var delete_ids = [];
            angular.forEach($scope.items_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = imApi.deleteAllItem({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = imApi.getItems({});
                    dataPromise.then(function(result) { 
                        $scope.items_data = result;
                    }); 
                });
            }
        };
        vm.deleteItem = function (id) {
            var delete_ids = JSON.stringify([id])
            imApi.deleteAllItem({ids: delete_ids})
            $window.location.reload();
        };
        vm.searchItemData = function(id){
            $cookies.putObject("search",vm.search_data);
            storageService.save('key', "search");
           
            $state.reload();
        }
        vm.searchItemDataClear = function(id){
            vm.search_data = {}
        }
    
    }
})();