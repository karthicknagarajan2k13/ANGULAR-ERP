(function ()
{
    'use strict';

    angular
        .module('app.crm')
        .controller('EditCustomerController', EditCustomerController);

    /** @ngInject */
    function EditCustomerController(crmApi, $scope, $document, $state, Customer, Customer_form)
    {
        var vm = this;
        vm.customer = Customer_form.edit_form({id:$state.params.obj.customer.id});

        vm.updateCustomer = function(){
           var dataPromise = crmApi.updateCustomer(vm.customer.id,vm.customer);
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
        vm.viewCustomerPage = function(id){
            $state.go('app.crm.customer-detail-view', {obj:{id: id}}); 
        }

    }

})();
