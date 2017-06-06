(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('TimeclocksController', TimeclocksController);

    /** @ngInject */
    function TimeclocksController($window, hrApi, $scope, $state)
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
        var dataPromise = hrApi.getTimeclocks({});
        dataPromise.then(function(result) { 
            $scope.timeclocks_data = result;
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
        vm.deleteTimeclock = function (id) {
            var delete_ids = JSON.stringify([id])
            hrApi.deleteAllTimeclock({ids: delete_ids})
            $window.location.reload();
        };
        vm.searchTimeclockData = function(id){
            var dataPromise = hrApi.getTimeclocks(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.timeclocks_data = result; 
            }); 
        }
        vm.searchTimeclockDataClear = function(id){
            vm.search_data = {}
        }
	
    }
})();