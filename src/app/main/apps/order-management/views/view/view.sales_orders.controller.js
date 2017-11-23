(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('viewSalesOrdersController', viewSalesOrdersController);

    /** @ngInject */
    function viewSalesOrdersController($scope, $window, omApi, $document, $state, $mdToast)
    {
        var session = $window.JSON.parse($window.localStorage.getItem('userInfo'));
        
        var vm = this;
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
        vm.dtInstance = {};
        vm.dtOptions = {
            bLengthChange  : false,
            paging: false,
            searching: false,
            bInfo: false,
        };		
		vm.SalesOrderNew = function(id){
            $state.go('app.order-management.sales-order-new'); 
        };

        //Api Call
        var data = {sales_order_id :$state.params.obj.id,user_id:session.id};
        
        var dataPromise = omApi.viewSalesOrder(data);

        dataPromise.then(function(result) { 
           /* console.log("-----"+JSON.stringify(result))*/
            $scope.sales_order_data = result.sales_order;
                var  customer_id = $scope.sales_order_data.customer_user_id;
                var  contact_id = $scope.sales_order_data.contact_user_id;

                var dataPromise = omApi.getCustomers();
                dataPromise.then(function(result) { 
                    vm.get_customers = result;
                    for(var i =0; i<vm.get_customers.length;i++){
                        if(customer_id ===vm.get_customers[i].customer_id ){
                            $scope.customerName = vm.get_customers[i].name;
                        }
                    }
                });

                var dataPromise = omApi.getContacts();
                dataPromise.then(function(result) { 
                    vm.get_contacts = result;
                     for(var i =0; i<vm.get_contacts.length;i++){
                          if(contact_id ===vm.get_contacts[i].contact_id ){
                            $scope.contactName = vm.get_contacts[i].name;
                        }
                        
                    }
                });
            /*$scope.sales_order_data = result; 

            var total_quantity = 0;
            var total_price = 0;
            angular.forEach($scope.sales_order_data.items, function(value, key) {
              total_quantity += value.quantity ;
              total_price += (value.quantity * value.item_price);
            });
            $scope.sales_order_data.total_quantity = total_quantity;
            $scope.sales_order_data.total_price = total_price;*/

        }); 
	
		/*vm.ssName = "s"*/

        var dataPromise = omApi.getCustomers();
        dataPromise.then(function(result) { 
            vm.get_customers = result;
        });

        var dataPromise = omApi.getContacts();
        dataPromise.then(function(result) { 
            vm.get_contacts = result;
        });

       /* $scope.getByID = function(arr, id, type) {

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
        */




        vm.deleteSalesOrder = function (id) {
            /*var delete_ids = JSON.stringify([id])
            omApi.deleteAllSalesOrder({ids: delete_ids})*/
            var dataPromise = omApi.deleteAllSalesOrder({sales_order_id: id,user_id:session.id})
            dataPromise.then(function(result) { 
                if(result.status === true){
                        $mdToast.show(
                          $mdToast.simple()
                            .textContent('Sales Order Deleted')
                           /* .position(pinTo )*/
                            .hideDelay(3000)
                        );
                    $state.go('app.order-management.sales-orders')
                }else{
                     $mdToast.show(
                          $mdToast.simple()
                            .textContent('Error : Sales order not deleted')
                           /* .position(pinTo )*/
                            .hideDelay(3000)
                        );
                }
                
                
            }); 
         
        };
        vm.editSalesOrder = function(data){
             $state.go('app.order-management.sales-order-edit', {obj:data});
        }
        vm.createInvoice = function (id) {
    
           var dataPromise = omApi.createInvoice({id:id});
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.invoice_id) !== "undefined"){
                        $state.go('app.order-management.invoices-edit', {obj:{id: $scope.data.invoice_id}}); 
                    }
                }
            }); 
        };

        vm.SalesOrdersPage = function(){
            $state.go('app.order-management.sales-orders'); 
        }


        vm.deleteSalesOrderInvoice = function (id) {
            var delete_ids = JSON.stringify([id])
            omApi.deleteAllSalesOrderInvoice({ids: delete_ids})
            $state.go('app.order-management.invoices')
        };
        vm.editSalesOrderInvoice = function(id){
             $state.go('app.order-management.invoices-edit', {obj:{id: id}});
        }
        vm.deleteAllSalesOrderInvoice = function () {
            var delete_ids = [];
            angular.forEach($scope.sales_order_data.invoices, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = omApi.deleteAllSalesOrderInvoice({ids: delete_ids})
                dataPromise.then(function(result) {
                    var dataPromise = omApi.viewSalesOrder($state.params.obj.id);
                    dataPromise.then(function(result) { 
                        $scope.sales_order_data = result; 

                        var total_quantity = 0;
                        var total_price = 0;
                        angular.forEach($scope.sales_order_data.items, function(value, key) {
                          total_quantity += value.quantity ;
                          total_price += (value.quantity * value.item_price);
                        });
                        $scope.sales_order_data.total_quantity = total_quantity;
                        $scope.sales_order_data.total_price = total_price;

                    }); 
                })
            }
        };
        vm.salesOrderView = function(id){
            $state.go('app.order-management.invoices-view', {obj:{id: id}}); 
        }

    }
})();