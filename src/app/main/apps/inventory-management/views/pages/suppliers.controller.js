(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('suppliersController', suppliersController);

    /** @ngInject */
    function suppliersController($window, imApi, $scope, $state)
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
        var dataPromise = imApi.getSuppliers({});
        dataPromise.then(function(result) { 
            $scope.suppliers_data = result;
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


        function initComplete(){
            $scope.show_table1 = true
        }
        
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