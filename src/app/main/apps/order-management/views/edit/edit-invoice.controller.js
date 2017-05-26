(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('SalesOrdersInvoiceEditController', SalesOrdersInvoiceEditController);

    /** @ngInject */
    function SalesOrdersInvoiceEditController($mdToast,$scope, omApi, $document, $state)
    {

        
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

        var dataPromise = omApi.get_SalesOrders();
        dataPromise.then(function(result) { 
            $scope.get_sales_orders = result;
            console.log("get_sales_orders",$scope.get_sales_orders)
        });
        var dataPromise = omApi.editSalesOrderInvoice({id:$state.params.obj.id});
        dataPromise.then(function(result) { 
            $scope.invoice = result;
            $scope.invoice.create_timestamp = new Date($scope.invoice.create_timestamp);
            $scope.invoice.cancelled_at = new Date($scope.invoice.cancelled_at);
            $scope.invoice.paid_at = new Date($scope.invoice.paid_at);
            $scope.invoice.refunded_at = new Date($scope.invoice.refunded_at);
            console.log("invoice",$scope.invoice)
        });
        vm.InvoicesPage = function(){
            $state.go('app.order-management.invoices'); 
        }
        
        vm.updateSalesOrderInvoice = function(){
           var dataPromise = omApi.updateSalesOrderInvoice($scope.invoice.id,$scope.invoice);
            dataPromise.then(function(result) { 
                $scope.data = result;
                console.log("$scope.data",$scope.data)
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

        vm.viewInvoiceSalseOrder =function(id){
            $state.go('app.order-management.invoices-view', {obj:{id: id}}); 
        }
        vm.newSalesOrderInvoice = function(){
            $state.go('app.order-management.invoices-new'); 
        }
		vm.ssName = "s"		
    }
})();