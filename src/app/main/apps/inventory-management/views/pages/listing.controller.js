(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('listingController', listingController)
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


    function listingController($cookies,storageService,$timeout,$window, imApi, User, $scope, $state)
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
            $state.go('app.inventory-management.listing-new'); 
        }
        vm.editItemPage = function(category){
             $state.go('app.inventory-management.items-edit', {obj:{item: category}});
        }
        vm.viewListingPage = function(id){
            $state.go('app.inventory-management.listing-view', {obj:{id: id}}); 
        }


        vm.deleteAllItem = function () {
            var delete_ids = [];
            angular.forEach($scope.get_listing, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                var data = delete_ids.toString();
              
                var dataPromise = imApi.delete_listing({"listing_id":data,user_id:session.id});
                dataPromise.then(function(result) { 
                    $window.location.reload();
                    /*var dataPromise1 = imApi.get_listing({user_id:session.id});
                        dataPromise1.then(function(result) { 
                          $scope.get_listing = result.listings;
                    }); */
                }); 
            }
        }; 



        vm.deleteItem = function (id) {
            var delete_ids = JSON.stringify([id])
            imApi.deleteAllItem({ids: delete_ids})
            $window.location.reload();
        };
        vm.searchListingData = function(id){

            var search_listing = {
                "search_listing[search_box]": vm.search_data.search_box,
                "search_listing[title]": vm.search_data.title,
                "search_listing[make]": vm.search_data.make,
                "search_listing[model]": vm.search_data.model,
                "search_listing[description]": vm.search_data.description,
                "user_id": session.id
            };
    

            $cookies.putObject("search",search_listing);
            storageService.save('key', "search");
           
            $state.reload();
        }
        vm.searchListingDataClear = function(id){
            vm.search_data = {}
        }

        //Inventory Item edited on 25-10-2017
      if( storageService.get('key') === null || storageService.get('key')  === "new"){
        var dataPromise = imApi.get_listing({user_id:session.id});
        dataPromise.then(function(result) { 
            $scope.get_listing = result.listings;
           /* $scope.items_data = result;*/

        });  
      }else{
       storageService.save('key', "new");
            var data = $cookies.getObject('search');
                var dataPromise = imApi.getSearchListingItems(data);
                dataPromise.then(function(result) { 
                    $scope.get_listing = result.search; 
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