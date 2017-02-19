(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('suppliersController', suppliersController);

    /** @ngInject */
    function suppliersController($window, imApi, $scope, $state, Statuses, Orders)
    {

        var vm = this;

        // Data
        vm.search_data = {}
        var dataPromise = imApi.getSuppliers({});
        dataPromise.then(function(result) { 
            $scope.suppliers_data = result;
            console.log("$scope.suppliers_data",$scope.suppliers_data)
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


        vm.newSupplierPage = function(){
            $state.go('app.inventory-management.suppliers-new'); 
        }
        vm.editSupplierPage = function(id){
             $state.go('app.inventory-management.suppliers-edit', {obj:{id: id}});
        }
        vm.viewSupplierPage = function(id){
            $state.go('app.inventory-management.suppliers-view', {obj:{id: id}}); 
        }
        vm.deleteAllSupplier = function () {
            var delete_ids = [];
            angular.forEach($scope.suppliers_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = imApi.deleteAllSupplier({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = imApi.getSuppliers({});
                    dataPromise.then(function(result) { 
                        $scope.suppliers_data = result;
                    }); 
                });
            }
        };
        vm.deleteSupplier = function (id) {
            var delete_ids = JSON.stringify([id])
            imApi.deleteAllSupplier({ids: delete_ids})
            $window.location.reload();
        };
        vm.searchSupplierData = function(id){
            console.log("vm.search_data",vm.search_data)
            var dataPromise = imApi.getSuppliers(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.suppliers_data = result; 
            }); 
        }
        vm.searchSupplierDataClear = function(id){
            vm.search_data = {}
        }
	
    }
})();