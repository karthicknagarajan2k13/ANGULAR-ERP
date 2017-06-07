(function ()
{
    'use strict';

    angular
        .module('app.crm')
        .controller('customerssController', customerssController);

    /** @ngInject */
    function customerssController($timeout,$scope, crmApi, $http, $window, Staff_User, $state, Customer)
    {
		

		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
        $scope.show_table1 = false
        $scope.show_table2 = false
		
        var vm = this;

        // Data
        var dataPromise = crmApi.getCustomers({});
        dataPromise.then(function(result) { 
            vm.customers_data = result;
            vm.dtInstance = {};
            vm.dtOptions = {
                dom         : 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
                columnDefs  : [
                    {
                        // Target the id column
                        targets: 0,
                        width  : '72px'
                    }
                ],
                initComplete: initComplete,
                pagingType  : 'simple',
                lengthMenu  : [10, 20, 30, 50, 100],
                pageLength  : 20,
                scrollY     : 'auto',
                responsive  : true
            };
            $timeout(function(){
                $scope.show_table2 = true
            }, 2000);
        });
        
        vm.search_data = {};
        vm.search_data.c_type1 = []

        var session = $window.JSON.parse($window.localStorage.getItem('current_user'))

        vm.get_users = Staff_User.get_users({token:session.email});

        function initComplete(){
            $scope.show_table1 = true
        }

        // Methods
        vm.editCustomerPage = function(customer){
			 $state.go('app.crm.customer-detail-edit', {obj:{customer: customer}});
		}
	    vm.viewCustomerPage = function(id){
			$state.go('app.crm.customer-detail-view', {obj:{id: id}}); 
		}
        vm.newCustomerPage = function(){
            $state.go('app.crm.customer-detail-new'); 
        }
        vm.searchCustomerData = function(){
            vm.search_data.c_type =  JSON.stringify(vm.search_data.c_type1)
            var dataPromise = crmApi.getCustomers(vm.search_data);
            dataPromise.then(function(result) { 
                vm.customers_data = result;
            });
            vm.search_data.c_type = ''
        }	
        vm.searchCustomerDataClear = function(){
            vm.search_data = {}
        }
        vm.deleteCustomer = function(id){
            var response = Customer.delete({id:id})
            $window.location.reload();
        }
        vm.deleteAllCustomer = function () {
            var delete_ids = [];
            angular.forEach(vm.customers_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = crmApi.deleteAllCustomer({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = crmApi.getCustomers({});
                    dataPromise.then(function(result) { 
                        vm.customers_data = result;
                    }); 
                });
            }
        };


    }
})();