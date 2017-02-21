(function ()
{
    'use strict';

    angular
        .module('app.warehouse-management')
        .controller('WareHouseController', WareHouseController);

    /** @ngInject */
    function WareHouseController($window, whApi, $scope, $state, Statuses)
    {

        var vm = this;

        // Data
        vm.search_data = {}
        var dataPromise = whApi.getWarehouses({});
        dataPromise.then(function(result) { 
            $scope.warehouses_data = result;
            console.log("$scope.warehouses_data",$scope.warehouses_data)
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
            var dataPromise = whApi.getWarehouses(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.warehouses_data = result; 
            }); 
        }
        vm.searchWarehouseDataClear = function(id){
            vm.search_data = {}
        }

		
    }
})();