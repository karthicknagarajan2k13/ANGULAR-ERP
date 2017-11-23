(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('NewSalesOrdersInvoicesController', NewSalesOrdersInvoicesController)  
        .directive('allowDecimalNumbers', function () {  
                return {  
                    restrict: 'A',  
                    link: function (scope, elm, attrs, ctrl) {  
                        elm.on('keydown', function (event) {  
                            var $input = $(this);  
                            var value = $input.val();  
                            value = value.replace(/[^0-9\.]/g, '')  
                            var findsDot = new RegExp(/\./g)  
                            var containsDot = value.match(findsDot)  
                            if (containsDot != null && ([46, 110, 190].indexOf(event.which) > -1)) {  
                                event.preventDefault();  
                                return false;  
                            }  
                            $input.val(value);  
                            if (event.which == 64 || event.which == 16) {  
                                // numbers  
                                return false;  
                            } if ([8, 13, 27, 37, 38, 39, 40, 110].indexOf(event.which) > -1) {  
                                // backspace, enter, escape, arrows  
                                return true;  
                            } else if (event.which >= 48 && event.which <= 57) {  
                                // numbers  
                                return true;  
                            } else if (event.which >= 96 && event.which <= 105) {  
                                // numpad number  
                                return true;  
                            } else if ([46, 110, 190].indexOf(event.which) > -1) {  
                                // dot and numpad dot  
                                return true;  
                            } else {  
                                event.preventDefault();  
                                return false;  
                            }  
                        });  
                    }  
                }  
            });

    /** @ngInject */
    function NewSalesOrdersInvoicesController($mdToast,$scope, omApi, $document, $state,$window)
    {

       var session = $window.JSON.parse($window.localStorage.getItem('userInfo'));

		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
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
        vm.invoice = {}


        var dataPromise = omApi.get_SalesOrders({user_id:session.id});
        dataPromise.then(function(result) { 
            $scope.get_sales_orders = result.sales_order;
           /* console.log("get_sales_orders",$scope.get_sales_orders)*/
        });

        var dataPromise = omApi.getCustomers();
        dataPromise.then(function(result) { 
            vm.get_customers = result;
            console.log("---"+JSON.stringify(vm.get_customers));
        });

        var dataPromise = omApi.getContacts();
        dataPromise.then(function(result) { 
            vm.get_contacts = result;
        });
        

        vm.InvoicesPage = function(){
            $state.go('app.order-management.invoices'); 
        }
        vm.createSalesOrderInvoice = function(){
            var dataPromise = omApi.createSalesOrderInvoice({invoice:vm.invoice});
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    var pinTo = $scope.getToastPosition();
                    $mdToast.show(
                      $mdToast.simple()
                        .textContent($scope.data.message)
                        .position(pinTo )
                        .hideDelay(3000)
                    );
                }else{
                    if( typeof($scope.data.invoice_id) !== "undefined"){
                        $state.go('app.order-management.invoices-view', {obj:{id: $scope.data.invoice_id}}); 
                    }
                }
            }); 
        }
        vm.salesOrderClear = function(){
            vm.sales_order = {};
        }

        vm.createSalesOrder = function(){    

            /*var data = {'sales_order[contact_user_id]':vm.sales_order.contact_user_id,
            'sales_order[customer_user_id]':vm.sales_order.customer_user_id,
            'sales_order[uid]':vm.sales_order.uid,'user_id':session.id}
            var dataPromise = omApi.createSalesOrder(data);*/
             var dataPromise = omApi.createSalesOrder({sales_order:vm.sales_order,user_id:session.id});
             dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    var pinTo = $scope.getToastPosition();
                    $mdToast.show(
                      $mdToast.simple()
                        .textContent($scope.data.message)
                        .position(pinTo )
                        .hideDelay(3000)
                    );
                }else{
                    if( typeof($scope.data.id) !== "undefined"){
                           $state.go('app.order-management.sales-order-view', {obj:{id: id}}); 
                    }
                }
                $state.go('app.order-management.sales-orders')
            }); 


        }
        vm.newSalesOrderInvoice = function(id){
            $state.go('app.order-management.invoices-new'); 
        }
    }
})();