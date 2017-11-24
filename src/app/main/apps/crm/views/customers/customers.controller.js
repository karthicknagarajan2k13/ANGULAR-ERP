(function ()
{
    'use strict';

    angular
        .module('app.crm')
        .controller('customerssController', customerssController)
        .factory('storageService', ['$rootScope', function($rootScope) {
                return {
                    get: function(key) {
                        return sessionStorage.getItem(key);
                    },
                    save: function(key, data) {
                        sessionStorage.setItem(key, data);
                    },
                    getModel: function(key) {
                        return sessionStorage.getItem(key);
                    },
                    setModel: function(key, data) {
                        sessionStorage.setItem(key, data);
                    }
            };
        }]);

    /** @ngInject */
    function customerssController($cookies,$timeout,$scope, crmApi, $http, $window, Staff_User, $state, Customer,storageService)
    {
        if(storageService.get('key')=== undefined){
             storageService.save('key', "new");
        }

		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
        $scope.show_table1 = false
        $scope.show_table2 = false
		
        var vm = this;
                vm.search_data = {};
        if( storageService.get('key') === null || storageService.get('key')  === "new"){
                var dataPromise = crmApi.getCustomers({});
                dataPromise.then(function(result) { 
                    vm.customers_data = result;
                  
                });
         }else{
            storageService.save('key', "new");
            var data = $cookies.getObject('search');
            var dataPromise = crmApi.getCustomers(data);
            dataPromise.then(function(result) { 
                vm.customers_data = result;
            });
             
         }
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
            $cookies.putObject("search",vm.search_data);
            storageService.save('key', "search");
            vm.search_data.c_type = ''
           
            $state.reload();
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