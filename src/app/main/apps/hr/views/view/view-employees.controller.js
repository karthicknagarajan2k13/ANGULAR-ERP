(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('hrviewController', hrviewController);

    /** @ngInject */
    function hrviewController($window, hrApi, $scope, $document, $state)
    {
        var vm = this;
        $scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
        vm.dtInstance = {};
        vm.dtOptions = {
            bLengthChange  : false,
            paging: false,
            searching: false,
            bInfo: false,
        };
		
		
		
		vm.ssName = "s"

        var dataPromise = hrApi.viewEmployee($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.employee_data = result;
        }); 
        $scope.editEmployeePage = function(id){
             $state.go('app.hr.employees-edit', {obj:{id: id}});
        }
        $scope.deleteEmployee = function(id){
            var delete_ids = JSON.stringify([id])
            hrApi.deleteAllEmployee({ids: delete_ids})
            $state.go('app.hr.employees'); 
        }
        vm.newPayrollPage = function(){
            $state.go('app.hr.payroll-new',{employee_id: $scope.employee_data.id}); 
        }
        vm.viewPayrollPage = function(id){
            $state.go('app.hr.payroll-view', {obj:{id: id}}); 
        }
        vm.deleteAllPayroll = function () {
            var delete_ids = [];
            angular.forEach($scope.employee_data.payrolls, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = hrApi.deleteAllPayroll({ids: delete_ids})
                dataPromise.then(function(result) {
                    var dataPromise = hrApi.viewEmployee($state.params.obj.id);
                    dataPromise.then(function(result) { 
                        $scope.employee_data = result;
                    });   
                });

            }
        };
        vm.newExpensePage = function(){
            $state.go('app.hr.expenses-new',{employee_id: $scope.employee_data.id}); 
        }
        vm.viewExpensePage = function(id){
            $state.go('app.hr.expenses-view', {obj:{id: id}}); 
        }
        vm.deleteAllExpense = function () {
            var delete_ids = [];
            angular.forEach($scope.employee_data.expenses, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = hrApi.deleteAllExpense({ids: delete_ids})
                dataPromise.then(function(result) {
                    var dataPromise = hrApi.viewEmployee($state.params.obj.id);
                    dataPromise.then(function(result) { 
                        $scope.employee_data = result;
                    });   
                });
            }
        };
        vm.newTimeclockPage = function(){
            $state.go('app.hr.timeclock-new',{employee_id: $scope.employee_data.id}); 
        }
        vm.viewTimeclockPage = function(id){
            $state.go('app.hr.timeclock-view', {obj:{id: id}}); 
        }
        vm.deleteAllTimeclock = function () {
            var delete_ids = [];
            angular.forEach($scope.employee_data.timeclocks, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = hrApi.deleteAllTimeclock({ids: delete_ids})
                dataPromise.then(function(result) {
                    var dataPromise = hrApi.viewEmployee($state.params.obj.id);
                    dataPromise.then(function(result) { 
                        $scope.employee_data = result;
                    });   
                });
            }
        };
        vm.newEmployeePage = function(){
            $state.go('app.hr.employees-new'); 
        }
        vm.EmployeesPage = function(){
            $state.go('app.hr.employees'); 
        }
    }
})();