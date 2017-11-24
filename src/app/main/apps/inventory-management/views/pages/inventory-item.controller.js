(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('inventoryItemController', inventoryItemController) 
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
    function inventoryItemController(storageService,$cookies, $timeout,$window, imApi, User, $scope, $state)
    {

        if(storageService.get('key')=== undefined){
             storageService.save('key', "new");
        }


       /* $cookies.put("type",null)*/
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
        $scope.show_table1 = false
        $scope.show_table2 = false
		
		var vm = this;
        var session = $window.JSON.parse($window.localStorage.getItem('userInfo'))
        vm.isAdmin = session.is_admin;
        //Inventory Item edited on 25-10-2017

       if(storageService.get('key') === null || storageService.get('key')  === "new"){
                var dataPromise = imApi.get_inventory_item({user_id:session.id});
                dataPromise.then(function(result) { 
                    $scope.get_inventory_item = result.inventory_items;
                
                  
                });  
        }else{
            storageService.save('key', "new");
            $scope.searchListData = $cookies.getObject("search");
               var search_data = $cookies.getObject("searchData");
            var dataPromise = imApi.getSearchInventoryItems($scope.searchListData);
            dataPromise.then(function(result) { 
                 $scope.get_inventory_item = [];
                 $scope.get_inventory_item = result.search; 
                 vm.search_data  =search_data;
                 $cookies.put("type",undefined);
                 
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

        /*var dataPromise = imApi.get_suppliers({});
        dataPromise.then(function(result) { 
            $scope.get_suppliers = result;
        });  
        var dataPromise = imApi.get_categories({});
        dataPromise.then(function(result) { 
            $scope.get_categories = result;
        });*/ 


        function initComplete(){
            $scope.show_table1 = true
        }
        
        vm.newItemPage = function(){
            $state.go('app.inventory-management.inventory-item-new'); 
        }
        vm.editItemPage = function(category){
             $state.go('app.inventory-management.items-edit', {obj:{item: category}});
        }
        vm.viewItemPage = function(id){
            $state.go('app.inventory-management.inventory-item-view', {obj:{id: id}}); 
        }


        vm.deleteAllItem = function () {
            var delete_ids = [];
            angular.forEach($scope.get_inventory_item, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                var data = delete_ids.toString();
              
                var dataPromise = imApi.deleteInventoryItem({"inventory_item_id":data,user_id:session.id});
                dataPromise.then(function(result) { 
                     $window.location.reload();
                    /*var dataPromise1 = imApi.get_inventory_item({user_id:session.id});
                        dataPromise1.then(function(result) { 
                        $scope.get_inventory_item = result.inventory_items;
                    }); */
                }); 
            }
        }; 
       



        vm.deleteItem = function (id) {
            var delete_ids = JSON.stringify([id])
            imApi.deleteAllItem({ids: delete_ids})
            $window.location.reload();
        };
        vm.searchInventoryItemData = function(id){
             $scope.search_inventory_item_data = {
                "search_inventory_item[search_box]": vm.search_data.search_box,
                "search_inventory_item[icc]": vm.search_data.icc,
                "search_inventory_item[serial]": vm.search_data.serial,
                "search_inventory_item[model]": vm.search_data.model,
                "search_inventory_item[make]": vm.search_data.make,
                "search_inventory_item[location]": vm.search_data.location,
                "user_id": session.id
            };
            storageService.save('key', "search");
            $cookies.putObject("search",$scope.search_inventory_item_data);
             $cookies.putObject("searchData",vm.search_data);
            $state.reload();
          
        }
        vm.searchInventoryItemDataClear = function(id){
            vm.search_data = {}
        }
    }        
}());