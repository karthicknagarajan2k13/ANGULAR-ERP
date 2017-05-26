(function ()
{
    'use strict';

    angular
        .module('app.warehouse-management')
        .controller('WarehouseLocationController', WarehouseLocationController);

    /** @ngInject */
    function WarehouseLocationController($window, whApi, $scope, $state)
    {

        
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
		
		
		var vm = this;

        // Data
        vm.search_data = {}
        vm.search_data.status1 = []

        var dataPromise = whApi.getWarehouseLocations({});
        dataPromise.then(function(result) { 
            $scope.warehouse_locations_data = result;
        });

        var dataPromise = whApi.get_warehouses({});
        dataPromise.then(function(result) { 
            $scope.get_warehouses = result;
        });
        var dataPromise = whApi.get_items({});
        dataPromise.then(function(result) { 
            $scope.get_items = result;
        }); 

        var dataPromise = whApi.getUsers({});
        dataPromise.then(function(result) { 
            $scope.get_users = result;
        }); 


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
        vm.newWarehouseLocationPage = function(){
            $state.go('app.warehouse-management.stock-locations-new'); 
        }
        vm.viewWarehouseLocationPage = function(id){
            $state.go('app.warehouse-management.stock-locations-view', {obj:{id: id}}); 
        }
        vm.deleteAllWarehouseLocation = function () {
            var delete_ids = [];
            angular.forEach($scope.warehouse_locations_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = whApi.deleteAllWarehouseLocation({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = whApi.getWarehouseLocations({});
                    dataPromise.then(function(result) { 
                        $scope.warehouse_locations_data = result;
                    }); 
                });
            }
        };
        vm.searchWarehouseLocationData = function(id){
            vm.search_data.status =  JSON.stringify(vm.search_data.status1)
            var dataPromise = whApi.getWarehouseLocations(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.warehouse_locations_data = result; 
                vm.search_data.status = ''
            });
            
        }
        vm.searchWarehouseLocationDataClear = function(id){
            vm.search_data = {}
        }
    }
})();