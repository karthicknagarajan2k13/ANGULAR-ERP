(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('purchaseOrdersController', purchaseOrdersController)
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
    function purchaseOrdersController(storageService,$cookies,$timeout,$window, imApi, $scope, $state)
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
            var dataPromise = imApi.getPurchaseOrders({});
            dataPromise.then(function(result) { 
                $scope.purchase_orders_data = result;

              
            }); 
         }else{
            storageService.save('key', "new");
            var data = $cookies.getObject('search');
            var dataPromise = imApi.getPurchaseOrders(data);
            dataPromise.then(function(result) { 
                $scope.purchase_orders_data = result; 
                vm.search_data  = data;
                
            }); 
         }
          vm.refreshData = function(){
            storageService.save('key', "new");
            $cookies.putObject("search",'');
            $state.reload();
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


        var dataPromise = imApi.get_suppliers({});
        dataPromise.then(function(result) { 
            $scope.get_suppliers = result;
        }); 
        var dataPromise = imApi.getUsers({});
        dataPromise.then(function(result) { 
            $scope.get_users = result;
        }); 



        function initComplete(){
            $scope.show_table1 = true
        }
        
        vm.newPurchaseOrderPage = function(){
            $state.go('app.inventory-management.purchase-orders-new'); 
        }
        vm.editPurchaseOrderPage = function(id){
             $state.go('app.inventory-management.purchase-orders-edit', {obj:{id: id}});
        }
        vm.viewPurchaseOrderPage = function(id){
            $state.go('app.inventory-management.purchase-orders-view', {obj:{id: id}}); 
        }
        vm.deleteAllPurchaseOrder = function () {
            var delete_ids = [];
            angular.forEach($scope.purchase_orders_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = imApi.deleteAllPurchaseOrder({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = imApi.getPurchaseOrders({});
                    dataPromise.then(function(result) { 
                        $scope.purchase_orders_data = result;
                    }); 
                });
            }
        };
        vm.deletePurchaseOrder = function (id) {
            var delete_ids = JSON.stringify([id])
            imApi.deleteAllPurchaseOrder({ids: delete_ids})
            $window.location.reload();
        };
        vm.searchPurchaseOrderData = function(id){
            console.log("vm.search_data",vm.search_data)

            $cookies.putObject("search",vm.search_data);
            storageService.save('key', "search");
            $state.reload();
        }
        vm.searchPurchaseOrderDataClear = function(id){
            vm.search_data = {}
        }
	
    }
})();