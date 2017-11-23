(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('itemSourceController', itemSourceController)
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
    function itemSourceController($cookies,storageService,$timeout,$window, imApi, User, $scope, $state)
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

      
        var session = $window.JSON.parse($window.localStorage.getItem('userInfo'))
        vm.isAdmin = session.is_admin;

        // Data

        function initComplete(){
            $scope.show_table1 = true
        }
        
        vm.newItemPage = function(){
            $state.go('app.inventory-management.item-source-new'); 
        }
        vm.editItemPage = function(category){
             $state.go('app.inventory-management.items-edit', {obj:{item: category}});
        }
        vm.viewItemSourcePage = function(id){
            $state.go('app.inventory-management.item-source-view', {obj:{id: id}}); 
        }


        vm.searchItemSourceData = function(id){

            var search_item_source_data = {
                "search_item_source[name]": vm.search_data.name,
                "search_item_source[short_name]": vm.search_data.short_name,
                "search_item_source[search_box]": vm.search_data.search_box,
                "user_id": session.id
            };
            $cookies.putObject("search",search_item_source_data);
            storageService.save('key', "search");
           
            $state.reload();
        }


        
        vm.searchItemSourceDataClear = function(id){
            vm.search_data = {}
        }


        vm.deleteAllItem = function () {
            var delete_ids = [];
            angular.forEach($scope.get_item_source, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                var data = delete_ids.toString();
              
                var dataPromise = imApi.delete_item_source({"item_source_id":data,user_id:session.id});
                dataPromise.then(function(result) { 
                     $window.location.reload();
                  /*  var dataPromise1 = imApi.get_item_source({user_id:session.id});
                        dataPromise1.then(function(result) { 
                            $scope.get_item_source = result.item_sources;
                    }); */
                }); 
            }
        }; 



        vm.deleteItem = function (id) {
            var delete_ids = JSON.stringify([id])
            imApi.deleteAllItem({ids: delete_ids})
            $window.location.reload();
        };
        vm.searchItemData = function(id){
            console.log("vm.search_data",vm.search_data)
            var dataPromise = imApi.getItems(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.items_data = result; 
            }); 
        }
        vm.searchItemDataClear = function(id){
            vm.search_data = {}
        }

        //Inventory Item edited on 25-10-2017

         if( storageService.get('key') === null || storageService.get('key')  === "new"){
                var dataPromise = imApi.get_item_source({user_id:session.id});
                dataPromise.then(function(result) { 
                    $scope.get_item_source = result.item_sources;
                   /* $scope.items_data = result;*/

                   
                });  
        }else{
            storageService.save('key', "new");
            var data = $cookies.getObject('search');
            var dataPromise = imApi.getItemSourceData(data);
            /*var dataPromise = imApi.getItemSourceData({'search_item_source':vm.search_data,'user_id':session.id});*/
            dataPromise.then(function(result) { 
                $scope.get_item_source = result.search;
              
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

     }
})();