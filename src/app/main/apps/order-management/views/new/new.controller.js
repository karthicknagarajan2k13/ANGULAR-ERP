(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('NewSalesOrdersInvoicesController', NewSalesOrdersInvoicesController);

    /** @ngInject */
    function NewSalesOrdersInvoicesController($mdToast,$scope, omApi, $document, $state)
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
        vm.invoice = {}


        var dataPromise = omApi.get_SalesOrders();
        dataPromise.then(function(result) { 
            $scope.get_sales_orders = result;
            console.log("get_sales_orders",$scope.get_sales_orders)
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
        vm.newSalesOrderInvoice = function(id){
            $state.go('app.order-management.invoices-new'); 
        }
		vm.ssName = "s"
    }
})();