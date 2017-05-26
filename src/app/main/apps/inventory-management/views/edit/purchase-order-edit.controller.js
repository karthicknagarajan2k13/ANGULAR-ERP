(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('editPurchaseOrderController', editPurchaseOrderController);

    /** @ngInject */
    function editPurchaseOrderController($mdToast,imApi, $scope, $document, $state)
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
        var dataPromise = imApi.editPurchaseOrder({id:$state.params.obj.id});
        dataPromise.then(function(result) { 
            $scope.purchase_order = result;
        });
        var dataPromise = imApi.get_suppliers({});
        dataPromise.then(function(result) { 
            $scope.get_suppliers = result;
        });
        
		vm.ssName = "s"

        vm.updatePurchaseOrder = function(){
           var dataPromise = imApi.updatePurchaseOrder($scope.purchase_order.id,$scope.purchase_order);
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
                    if( typeof($scope.data.purchase_order_id) !== "undefined"){
                        $state.go('app.inventory-management.purchase-orders-view', {obj:{id: $scope.data.purchase_order_id}}); 
                    }
                }
            }); 
        }
        vm.viewPurchaseOrderPage =function(id){
            $state.go('app.inventory-management.purchase-orders-view', {obj:{id: id}}); 
        }
        vm.newPurchaseOrderPage = function(){
            $state.go('app.inventory-management.purchase-orders-new'); 
        }
        vm.PurchaseOrdersPage = function(){
            $state.go('app.inventory-management.purchase-orders'); 
        }
        vm.total_calculation = function(){
            if($scope.purchase_order.tax && $scope.purchase_order.sub_total){
                $scope.purchase_order.grand_total =  parseInt($scope.purchase_order.tax, 10) + parseInt($scope.purchase_order.sub_total, 10)
            }
        }
    }
})();