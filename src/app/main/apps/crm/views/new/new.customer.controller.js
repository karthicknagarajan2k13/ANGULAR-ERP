(function ()
{
    'use strict';

    angular
        .module('app.crm')
        .controller('NewCustomerController', NewCustomerController);

    /** @ngInject */
    function NewCustomerController($scope, $timeout, crmApi, $document, $state, Customers)
    {
        var vm = this;
        vm.customer = {}
        vm.customer.customer_attributes = {}

        vm.saveCustomer = function(){
            var dataPromise = crmApi.createCustomer({customer:vm.customer});
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
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
    }

})();
