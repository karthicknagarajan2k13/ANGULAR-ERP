(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('TimeclocksController', TimeclocksController)
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
    function TimeclocksController(storageService,$cookies,$timeout,$window, hrApi, $scope, $state)
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
                var dataPromise = hrApi.getTimeclocks({});
                dataPromise.then(function(result) { 
                    $scope.timeclocks_data = result;
                    
                });
        }else{
            storageService.save('key', "new");
            var data = $cookies.getObject('search');
               var dataPromise = hrApi.getTimeclocks(data);
                dataPromise.then(function(result) { 
                $scope.timeclocks_data = result; 
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



        var dataPromise = hrApi.get_employees({});
        dataPromise.then(function(result) { 
            $scope.get_employees = result;
        });  
        var dataPromise = hrApi.getUsers({});
        dataPromise.then(function(result) { 
            $scope.get_users = result;
        }); 


        function initComplete(){
            $scope.show_table1 = true
        }
        vm.newTimeclockPage = function(){
            $state.go('app.hr.timeclock-new'); 
        }
        vm.editTimeclockPage = function(timeclock){
             $state.go('app.hr.timeclock-edit', {obj:{timeclock: timeclock}});
        }
        vm.viewTimeclockPage = function(id){
            $state.go('app.hr.timeclock-view', {obj:{id: id}}); 
        }
        vm.deleteAllTimeclock = function () {
            var delete_ids = [];
            angular.forEach($scope.timeclocks_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = hrApi.deleteAllTimeclock({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = hrApi.getTimeclocks({});
                    dataPromise.then(function(result) { 
                        $scope.timeclocks_data = result;
                    }); 
                });
            }
        };
        vm.refreshData = function(){
            storageService.save('key', "new");
            $cookies.putObject("search",'');
            $state.reload();
        }       

         vm.deleteTimeclock = function (id) {
            var delete_ids = JSON.stringify([id])
            hrApi.deleteAllTimeclock({ids: delete_ids})
            $window.location.reload();
        };
        vm.searchTimeclockData = function(id){
            $cookies.putObject("search",vm.search_data);
            storageService.save('key', "search");
           
            $state.reload();

        }
        vm.searchTimeclockDataClear = function(id){
            vm.search_data = {}
        }
	
    }
})();