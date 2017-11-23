(function ()
{
    'use strict';

    angular
        .module('app.crm')
        .controller('NewCustomerController', NewCustomerController);

    /** @ngInject */
    function NewCustomerController($mdToast,$scope, $timeout, crmApi, $document, $state)
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
        vm.customer = {}
        vm.customer.customer_attributes = {}

        vm.saveCustomer = function(){
            var dataPromise = crmApi.createCustomer({customer:vm.customer});
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
                    if( typeof($scope.data.customer_id) !== "undefined"){
                        $state.go('app.crm.customer-detail-view', {obj:{id: $scope.data.customer_id}}); 
                    }
                }
            }); 
        }
        vm.customerDataClear = function(){
            vm.customer = {}
        }
        vm.newCustomerPage = function(){
            $state.go('app.crm.customer-detail-new'); 
        }
        vm.CustomersPage = function(){
            $state.go('app.crm.customers'); 
        }
    }

})();
