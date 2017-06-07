(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('PayrollsController', PayrollsController);

    /** @ngInject */
    function PayrollsController($timeout,$window, hrApi, $scope, $state)
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
        vm.search_data = {}
        var dataPromise = hrApi.getPayrolls({});
        dataPromise.then(function(result) { 
            $scope.payrolls_data = result;
            vm.dtInstance = {};
            vm.dtOptions = {
                dom         : 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
                columnDefs  : [
                    {
                        // Target the id column
                        targets: 0,
                        width  : '10px'
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
        var dataPromise = hrApi.get_employees({});
        dataPromise.then(function(result) { 
            $scope.get_employees = result;
            console.log($scope.get_employees)
        });  
        var dataPromise = hrApi.getUsers({});
        dataPromise.then(function(result) { 
            $scope.get_users = result;
        });


        function initComplete(){
            $scope.show_table1 = true
        }
        vm.newPayrollPage = function(){
            $state.go('app.hr.payroll-new'); 
        }
        vm.editPayrollPage = function(payroll){
             $state.go('app.hr.payroll-edit', {obj:{payroll: payroll}});
        }
        vm.viewPayrollPage = function(id){
            $state.go('app.hr.payroll-view', {obj:{id: id}}); 
        }
        vm.deleteAllPayroll = function () {
            var delete_ids = [];
            angular.forEach($scope.payrolls_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = hrApi.deleteAllPayroll({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = hrApi.getPayrolls({});
                    dataPromise.then(function(result) { 
                        $scope.payrolls_data = result;
                    }); 
                });
            }
        };
        vm.deletePayroll = function (id) {
            var delete_ids = JSON.stringify([id])
            hrApi.deleteAllPayroll({ids: delete_ids})
            $window.location.reload();
        };
        vm.searchPayrollData = function(id){
            var dataPromise = hrApi.getPayrolls(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.payrolls_data = result; 
            }); 
        }
        vm.searchPayrollDataClear = function(id){
            vm.search_data = {}
        }
	
    }
})();