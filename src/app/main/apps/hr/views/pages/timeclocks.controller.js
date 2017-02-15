(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('TimeclocksController', TimeclocksController);

    /** @ngInject */
    function TimeclocksController($window, hrApi, $scope, $state, Statuses, Orders)
    {

        var vm = this;

        // Data
        vm.search_data = {}
        var dataPromise = hrApi.getTimeclocks({});
        dataPromise.then(function(result) { 
            $scope.timeclocks_data = result;
            console.log("$scope.timeclocks_data",$scope.timeclocks_data)
        });
        var dataPromise = hrApi.get_employees({});
        dataPromise.then(function(result) { 
            $scope.get_employees = result;
            console.log($scope.get_employees)
        });  
        var dataPromise = hrApi.getUsers({});
        dataPromise.then(function(result) { 
            $scope.get_users = result;
        }); 
        
        vm.orders = Orders.data;
        vm.statuses = Statuses.data;
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
            initComplete: function ()
            {
                var api = this.api(),
                    searchBox = angular.element('body').find('#e-commerce-products-search');

                // Bind an external input as a table wide search box
                if ( searchBox.length > 0 )
                {
                    searchBox.on('keyup', function (event)
                    {
                        api.search(event.target.value).draw();
                    });
                }
            },
            pagingType  : 'simple',
            lengthMenu  : [10, 20, 30, 50, 100],
            pageLength  : 20,
            scrollY     : 'auto',
            responsive  : true
        };


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
                hrApi.deleteAllTimeclock({ids: delete_ids})
                $window.location.reload();
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