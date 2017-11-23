(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('SalesOrdersEditController', SalesOrdersEditController);

    /** @ngInject */
    function SalesOrdersEditController($mdToast,$scope, omApi, $document, $state, $window)
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
        $scope.sales_order = $state.params.obj;
        console.log(JSON.stringify($state.params.obj));

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

       /* var dataPromise = omApi.editSalesOrder({id:$state.params.obj.id});
        dataPromise.then(function(result) { 
            console.log("---"+JSON.stringify(result))
            $scope.sales_order = result;
            $scope.salesID = $scope.sales_order.id;
        });
*/
        var dataPromise = omApi.getCustomers();
        dataPromise.then(function(result) { 
            $scope.get_customers = result;
            /*console.log("get_customers",$scope.get_customers)*/
        });
        
        var dataPromise = omApi.getContacts();
        dataPromise.then(function(result) { 
            $scope.get_contacts = result;
            /*console.log("get_contacts",$scope.get_contacts)*/
        });
        vm.deleteSalesOrder = function (id) {
        var dataPromise = omApi.deleteAllSalesOrder({sales_order_id: id,user_id:session.id})
            dataPromise.then(function(result) { 
                if(result.status === true){
                        $mdToast.show(
                          $mdToast.simple()
                            .textContent('Sales Order Deleted')
                            .hideDelay(3000)
                        );
                    $state.go('app.order-management.sales-orders')
                }else{
                     $mdToast.show(
                          $mdToast.simple()
                            .textContent('Error : Sales order not deleted')
                            .hideDelay(3000)
                        );
                }
                
                
            }); 
         
        };
/*
        vm.updateSalesOrder = function(){
           var dataPromise = omApi.updateSalesOrder($scope.sales_order.id,$scope.sales_order);
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
                    if( typeof($scope.data.sales_order_id) !== "undefined"){
                        $state.go('app.order-management.sales-order-view', {obj:{id: $scope.data.sales_order_id}}); 
                    }
                }
            }); 
        }*/
         vm.updateSalesOrder = function(){

          var data = {'sales_order[contact_user_id]':$scope.sales_order.contact_user_id,
            'sales_order[customer_user_id]':$scope.sales_order.customer_user_id,
            'sales_order[uid]':$scope.sales_order.uid,sales_order_id: $scope.sales_order.id,user_id:session.id};


           var dataPromise = omApi.editSalesOrder(data);
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
                }/*else{
                    if( typeof($scope.data.sales_order_id) !== "undefined"){
                        $state.go('app.order-management.sales-order-view', {obj:{id: $scope.data.sales_order_id}}); 
                    }
                }*/
                  $state.go('app.order-management.sales-orders'); 
            }); 
        }

        vm.SalesOrderNew = function(id){
            $state.go('app.order-management.sales-order-new'); 
        }
        vm.SalesOrdersPage = function(){
            $state.go('app.order-management.sales-orders'); 
        }
		/*vm.ssName = "s"		*/
    }
})();