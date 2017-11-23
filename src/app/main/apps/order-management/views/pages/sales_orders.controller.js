(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('SalesOrderController', SalesOrderController)
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
    function SalesOrderController($cookies,storageService,$timeout,$mdToast,$window, omApi, $scope, $state)
    {
         if(storageService.get('key')=== undefined){
             storageService.save('key', "new");
        }
        var session = $window.JSON.parse($window.localStorage.getItem('userInfo'));
        
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
        vm.search_data = {};

        /*var dataPromise = omApi.getSalesOrders({});*/   
        if( storageService.get('key') === null || storageService.get('key')  === "new"){     
            var dataPromise = omApi.get_SalesOrders({'user_id':session.id});
            dataPromise.then(function(result) { 
                $scope.sales_orders_data = result.sales_order; 
              
            }); 
         }else{
           storageService.save('key', "new");
           var data = $cookies.getObject('search');
           var dataPromise = omApi.getSearchSalesOrders({search_sales_orders:data,user_id:session.id});
       
            dataPromise.then(function(result) { 
                $scope.sales_orders_data = result.search; 
            
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

        var dataPromise = omApi.getCustomers();
        dataPromise.then(function(result) { 
            vm.get_customers = result;
        });

        var dataPromise = omApi.getContacts();
        dataPromise.then(function(result) { 
            vm.get_contacts = result;
        });

        $scope.getByID = function(arr, id, type) {
            for (var d = 0, len = arr.length; d < len; d += 1) {
                if(type === "contact"){
                    if (arr[d].contact_id === id) {

                        return arr[d].name;
                    }
                }else{
                      if (arr[d].customer_id === id) {
                
                        return arr[d].name;
                    }
                }
            }
        }
        


        function initComplete(){
            $scope.show_table1 = true
        }
        
		// Methods
        vm.searchSalesOrdersData = function(){
            var search_sales_orders = {
                "search_sales_orders[uid]": vm.search_data.uid,
                "search_sales_orders[customer_user_id]": vm.search_data.customer_user_id,
                "search_sales_orders[contact_user_id]": vm.search_data.contact_user_id,
                "search_sales_orders[search_box]": vm.search_data.search_box,
                "user_id": session.id
            };


            $cookies.putObject("search",vm.search_data);
            storageService.save('key', "search");
           
            $state.reload();
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
                var data = delete_ids.toString();
                var dataPromise = omApi.deleteAllSalesOrder({sales_order_id: data,user_id:session.id})
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
            $state.reload()

        };
        vm.refreshSalesOrder = function () {
            $state.reload()
          /*  omApi.refreshSalesOrder().then(function(result){
                var dataPromise = omApi.getSalesOrders({});
                dataPromise.then(function(result) { 
                    $scope.sales_orders_data = result; 
                }); 
            });*/
        };
        vm.salesOrderView = function(id){
            $state.go('app.order-management.sales-order-view', {obj:{id: id}}); 
        };
        vm.salesOrderEdit = function(id){
            $state.go('app.order-management.sales-order-edit', {obj:{id: id}}); 
        };
        vm.SalesOrderNew = function(id){
            $state.go('app.order-management.sales-order-new'); 
        };
    }
})();