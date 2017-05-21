(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('newPurchaseOrderController', newPurchaseOrderController);

    /** @ngInject */
    function newPurchaseOrderController($mdToast,imApi, $scope, $document, $state, Product)
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
        vm.purchase_order = {}
        vm.purchase_order.supplier_user_id = $state.params.supplier_id
        console.log("$state.params.supplier_id",$state.params.supplier_id)
		vm.ssName = "s"
	    vm.orders = Product.data;
        var dataPromise = imApi.get_suppliers({});
        dataPromise.then(function(result) { 
            $scope.get_suppliers = result;
            console.log("$scope.get_suppliers",$scope.get_suppliers)
        }); 
        vm.savePurchaseOrder = function(){
            var dataPromise = imApi.createPurchaseOrder({purchase_order:vm.purchase_order});
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
        vm.purchaseOrderDataClear = function(){
            vm.purchase_order = {}
        }
        vm.newPurchaseOrderPage = function(){
            $state.go('app.inventory-management.purchase-orders-new'); 
        }
        vm.PurchaseOrdersPage = function(){
            $state.go('app.inventory-management.purchase-orders'); 
        }

        vm.total_calculation = function(){
            if(vm.purchase_order.tax && vm.purchase_order.sub_total){
                vm.purchase_order.grand_total =  parseInt(vm.purchase_order.tax, 10) + parseInt(vm.purchase_order.sub_total, 10)
            }
        }
        /**
         * File upload success callback
         * Triggers when single upload completed
         *
         * @param file
         * @param message
         */
        function fileSuccess(file, message)  {
            // Iterate through the media list, find the one we
            // are added as a temp and replace its data
            // Normally you would parse the message and extract
            // the uploaded file data from it
            angular.forEach(vm.product.images, function (media, index)
            {
                if ( media.id === file.uniqueIdentifier )
                {
                    // Normally you would update the media purchase_order
                    // from database but we are cheating here!
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(media.file.file);
                    fileReader.onload = function (event)
                    {
                        media.url = event.target.result;
                    };

                    // Update the image type so the overlay can go away
                    media.type = 'image';
                }
            });
        }
		
    }
})();