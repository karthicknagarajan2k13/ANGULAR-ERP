(function ()
{
    'use strict';

    angular
        .module('app.manufacturing')
        .controller('ManufacturingController', ManufacturingController);

    /** @ngInject */
    function ManufacturingController($window, mfgApi, $scope, $state)
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
        var dataPromise = mfgApi.getManufacturings({});
        dataPromise.then(function(result) { 
            $scope.manufacturings_data = result;
            console.log("$scope.manufacturings_data",$scope.manufacturings_data)
        }); 
        var dataPromise = mfgApi.getUsers({});
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


        vm.newManufacturingPage = function(){
            $state.go('app.manufacturing.manufacturing-new'); 
        }
        vm.viewManufacturingPage = function(id){
            $state.go('app.manufacturing.manufacturing-view', {obj:{id: id}}); 
        }
        vm.deleteAllManufacturing = function () {
            var delete_ids = [];
            angular.forEach($scope.manufacturings_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = mfgApi.deleteAllManufacturing({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = mfgApi.getManufacturings({});
                    dataPromise.then(function(result) { 
                        $scope.manufacturings_data = result;
                    }); 
                });
            }
        };
        vm.searchManufacturingData = function(id){
            var dataPromise = mfgApi.getManufacturings(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.manufacturings_data = result; 
            }); 
        }
        vm.searchManufacturingDataClear = function(id){
            vm.search_data = {}
        }

		
    }
})();