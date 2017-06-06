(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('SalesOrderController', SalesOrderController);

    /** @ngInject */
    function SalesOrderController($mdToast,$window, omApi, $scope, $state)
    {

        
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
        $scope.show_table1 = false
        $scope.show_table2 = false

        var last = {
          bottom: false,
          top: true,
          left: false,
          right: true
        };
        function sanitizePosition() {
            var current = $scope.toastPosition;
            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;
            last = angular.extend({},current);
        }
        $scope.toastPosition = angular.extend({},last);
        $scope.getToastPosition = function() {
        sanitizePosition();
        return Object.keys($scope.toastPosition)
          .filter(function(pos) { return $scope.toastPosition[pos]; })
          .join(' ');
        };
		var vm = this;

        //Data
        vm.search_data = {}
        var dataPromise = omApi.getSalesOrders({});
        dataPromise.then(function(result) { 
            $scope.sales_orders_data = result; 
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
            console.log("$scope.sales_orders_data",$scope.sales_orders_data)
        }); 


        function initComplete(){
            $scope.show_table1 = true
        }
        
		// Methods
        vm.searchSalesOrdersData = function(){
            var dataPromise = omApi.getSalesOrders(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.sales_orders_data = result; 
            }); 
        }   
        vm.searchSalesOrdersDataClear = function(){
            vm.search_data = {}
        }
        vm.deleteAllSalesOrder = function () {
            var delete_ids = [];
            angular.forEach($scope.sales_orders_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = omApi.deleteAllSalesOrder({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = omApi.getSalesOrders({});
                    dataPromise.then(function(result) { 
                        $scope.sales_orders_data = result;
                    }); 
                });
            }
        };
        vm.deleteSalesOrder = function (id) {
            var delete_ids = JSON.stringify([id])
            omApi.deleteAllSalesOrder({ids: delete_ids})
            $window.location.reload();
        };
        vm.refreshSalesOrder = function () {
            omApi.refreshSalesOrder().then(function(result){
                var dataPromise = omApi.getSalesOrders({});
                dataPromise.then(function(result) { 
                    $scope.sales_orders_data = result; 
                }); 
            });
        };
        vm.salesOrderView = function(id){
            $state.go('app.order-management.sales-order-view', {obj:{id: id}}); 
        }
        vm.salesOrderEdit = function(id){
            $state.go('app.order-management.sales-order-edit', {obj:{id: id}}); 
        }
        
    }
})();